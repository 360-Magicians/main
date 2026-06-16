Perfect. I'll walk you through the architecture design, then give you the webhook payloads and routing logic to test locally.

---

## Part B: Detailed Architecture Design

### System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR BACKEND SYSTEM                          │
│  (Sends events to Zapier webhook URL)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ POST /hooks/catch/1234567/abc123/
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│         ZAPIER SINGLE ORCHESTRATION ZAP                         │
│                                                                  │
│  Step 1: Catch Hook Trigger (receives all events)              │
│          ↓                                                       │
│  Step 2: Formatter (extract event_type field)                  │
│          ↓                                                       │
│  Step 3–7: Paths (route based on event_type)                   │
│          ├─ Path 1: idea_created → Webhook POST                │
│          ├─ Path 2: idea_validated → Webhook POST              │
│          ├─ Path 3: proposal_generated → Webhook POST          │
│          ├─ Path 4: intake_submitted → Webhook POST            │
│          └─ Path 5: vr_decision → Webhook POST                 │
│          ↓                                                       │
│  Step 8 (Optional): Zapier Table → Store audit log             │
└────────┬──────────┬──────────┬──────────┬──────────┬────────────┘
         │          │          │          │          │
         ↓          ↓          ↓          ↓          ↓
    vision.    validated.  proposal.  workspace.  decision.
    vr4deaf.   vr4deaf.    vr4deaf.   vr4deaf.    vr4deaf.
    org/api/   org/api/    org/api/   org/api/    org/api/
    ideas      validations proposals  intake      decisions
```

---

## Zap Step Breakdown

### Step 1: Webhook Trigger (Catch Hook)
**Input:** Receives POST requests with event data

**Configuration:**
- App: Webhooks by Zapier
- Event: Catch Hook
- Pick Off A Child Key: (leave blank—we want the full payload)

**Output:** Zapier generates a unique URL:
```
https://hooks.zapier.com/hooks/catch/1234567/abc123/
```

**Your backend posts to this URL.**

---

### Step 2: Formatter (Extract event_type)
**Purpose:** Parse the incoming JSON and make `event_type` available for routing

**Configuration:**
- App: Formatter by Zapier
- Event: Text → Extract
- Input: `event_type` (from webhook payload)

**Output:** Clean `event_type` field for Paths to use

---

### Step 3: Paths (Conditional Routing)
**Purpose:** Route each event to the correct subdomain

**5 Paths:**

| Path | Condition | Action |
|------|-----------|--------|
| **Path 1** | `event_type == "idea_created"` | Webhook POST to `https://vision.vr4deaf.org/api/ideas` |
| **Path 2** | `event_type == "idea_validated"` | Webhook POST to `https://validated.vr4deaf.org/api/validations` |
| **Path 3** | `event_type == "proposal_generated"` | Webhook POST to `https://proposal.vr4deaf.org/api/proposals` |
| **Path 4** | `event_type == "intake_submitted"` | Webhook POST to `https://workspace.vr4deaf.org/api/intake` |
| **Path 5** | `event_type == "vr_decision"` | Webhook POST to `https://decision.vr4deaf.org/api/decisions` |

**Default Path (no match):** Log to table or send alert

---

### Steps 4–8: Webhook Actions (Outbound)
**Each Path contains one step:**

**Configuration per Path:**
- App: Webhooks by Zapier
- Event: POST
- URL: `https://[subdomain].vr4deaf.org/api/[endpoint]`
- Payload Type: JSON
- Data: Map all fields from webhook payload (event_type, data.idea_id, data.title, etc.)
- Headers: `Content-Type: application/json` (auto-added)

---

### Step 9 (Optional): Zapier Tables - Create Row
**Purpose:** Audit log of all events

**Configuration:**
- App: Zapier Tables
- Event: Create Row
- Table: "Event Log"
- Fields:
  - `event_type`: From webhook
  - `timestamp`: From webhook
  - `event_data`: Full payload (JSON)
  - `routed_to`: Subdomain (from Path)
  - `status`: "Success" or "Error"

---

## Task Consumption

**Per 100 events:**
- Catch Hook: 1 task
- Formatter: 1 task
- Path routing: 1 task (counted once, not per branch)
- 5 Webhook POSTs: 5 tasks
- Table row: 1 task
- **Total: 9 tasks per 100 events**

At 500 events/month: ~45 tasks/month = well within Professional limits (750/month baseline)

---

## Part C: Webhook Payloads & Local Testing

Now here's what you use to **test locally before upgrading to Zapier.**

### Webhook Payload Structure

**Standard Event Payload:**

```json
{
  "event_type": "idea_created",
  "timestamp": "2024-01-15T10:30:00Z",
  "event_id": "evt_abc123xyz",
  "data": {
    "idea_id": "idea_001",
    "title": "Accessible Video AI Tool",
    "submitter_email": "user@example.com",
    "submitter_name": "Alex Chen",
    "description": "An AI-powered tool for auto-captioning videos for deaf and hard of hearing audiences",
    "category": "accessibility",
    "tags": ["video", "ai", "deaf"],
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### All 5 Event Types (Example Payloads)

#### Event 1: idea_created
```json
{
  "event_type": "idea_created",
  "timestamp": "2024-01-15T10:30:00Z",
  "event_id": "evt_001",
  "data": {
    "idea_id": "idea_001",
    "title": "Accessible Video AI Tool",
    "submitter_email": "user@example.com",
    "submitter_name": "Alex Chen",
    "description": "An AI-powered tool for auto-captioning videos",
    "category": "accessibility",
    "tags": ["video", "ai", "deaf"]
  }
}
```

**Routed to:** `POST https://vision.vr4deaf.org/api/ideas`

---

#### Event 2: idea_validated
```json
{
  "event_type": "idea_validated",
  "timestamp": "2024-01-16T14:00:00Z",
  "event_id": "evt_002",
  "data": {
    "idea_id": "idea_001",
    "validation_status": "approved",
    "validator_email": "reviewer@example.com",
    "validator_name": "Jordan Smith",
    "feedback": "Strong concept with clear market need",
    "score": 8.5,
    "validated_at": "2024-01-16T14:00:00Z"
  }
}
```

**Routed to:** `POST https://validated.vr4deaf.org/api/validations`

---

#### Event 3: proposal_generated
```json
{
  "event_type": "proposal_generated",
  "timestamp": "2024-01-17T09:15:00Z",
  "event_id": "evt_003",
  "data": {
    "idea_id": "idea_001",
    "proposal_id": "prop_001",
    "proposal_title": "Phase 1: MVP Development",
    "estimated_budget": 50000,
    "timeline_weeks": 12,
    "generated_by": "system",
    "proposal_url": "https://workspace.vr4deaf.org/proposals/prop_001",
    "generated_at": "2024-01-17T09:15:00Z"
  }
}
```

**Routed to:** `POST https://proposal.vr4deaf.org/api/proposals`

---

#### Event 4: intake_submitted
```json
{
  "event_type": "intake_submitted",
  "timestamp": "2024-01-18T11:45:00Z",
  "event_id": "evt_004",
  "data": {
    "idea_id": "idea_001",
    "intake_id": "intake_001",
    "submitter_email": "user@example.com",
    "organization_name": "DeafTech Innovations",
    "team_size": 3,
    "funding_stage": "Pre-seed",
    "contact_phone": "+1-555-0123",
    "contact_address": "123 Main St, San Francisco, CA 94102",
    "submitted_at": "2024-01-18T11:45:00Z"
  }
}
```

**Routed to:** `POST https://workspace.vr4deaf.org/api/intake`

---

#### Event 5: vr_decision
```json
{
  "event_type": "vr_decision",
  "timestamp": "2024-01-19T16:30:00Z",
  "event_id": "evt_005",
  "data": {
    "idea_id": "idea_001",
    "decision": "approved",
    "decision_maker": "vr_committee",
    "decision_reason": "Meets all criteria for Phase 1 funding",
    "approved_budget": 50000,
    "next_steps": "Contract signing and onboarding",
    "decided_at": "2024-01-19T16:30:00Z"
  }
}
```

**Routed to:** `POST https://decision.vr4deaf.org/api/decisions`

---

## Local Testing: cURL Commands

You can test your backend's ability to send webhooks **before connecting to Zapier**. Use a local webhook inspector.

### Option 1: Zapier's Testing Service
Go to **webhook.site**, get a temp URL (e.g., `https://webhook.site/unique-id`), and send test data:

```bash
curl -X POST https://webhook.site/unique-id \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "idea_created",
    "timestamp": "2024-01-15T10:30:00Z",
    "event_id": "evt_001",
    "data": {
      "idea_id": "idea_001",
      "title": "Accessible Video AI Tool",
      "submitter_email": "user@example.com",
      "submitter_name": "Alex Chen"
    }
  }'
```

**Result:** You'll see the payload appear on webhook.site in real-time.

---

### Option 2: Local Node.js Webhook Server
Run this locally to simulate receiving webhooks:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      const event = JSON.parse(body);
      console.log('✅ Received event:', event.event_type);
      console.log('📍 Routed to subdomain:', getSubdomain(event.event_type));
      console.log('---');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, event_id: event.event_id }));
    });
  }
});

function getSubdomain(eventType) {
  const routing = {
    'idea_created': 'vision.vr4deaf.org/api/ideas',
    'idea_validated': 'validated.vr4deaf.org/api/validations',
    'proposal_generated': 'proposal.vr4deaf.org/api/proposals',
    'intake_submitted': 'workspace.vr4deaf.org/api/intake',
    'vr_decision': 'decision.vr4deaf.org/api/decisions'
  };
  return routing[eventType] || 'unknown';
}

server.listen(3000, () => {
  console.log('🎣 Local webhook server running on http://localhost:3000/webhook');
});
```

**Run it:**
```bash
node server.js
```

**Send a test event:**
```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "idea_created",
    "timestamp": "2024-01-15T10:30:00Z",
    "event_id": "evt_001",
    "data": {
      "idea_id": "idea_001",
      "title": "Accessible Video AI Tool",
      "submitter_email": "user@example.com",
      "submitter_name": "Alex Chen"
    }
  }'
```

**Output:**
```
✅ Received event: idea_created
📍 Routed to subdomain: vision.vr4deaf.org/api/ideas
---
```

---

## Routing Logic (Pseudocode)

```pseudocode
RECEIVE webhook_payload

event_type = payload.event_type

IF event_type == "idea_created"
  POST payload TO https://vision.vr4deaf.org/api/ideas
  
ELSE IF event_type == "idea_validated"
  POST payload TO https://validated.vr4deaf.org/api/validations
  
ELSE IF event_type == "proposal_generated"
  POST payload TO https://proposal.vr4deaf.org/api/proposals
  
ELSE IF event_type == "intake_submitted"
  POST payload TO https://workspace.vr4deaf.org/api/intake
  
ELSE IF event_type == "vr_decision"
  POST payload TO https://decision.vr4deaf.org/api/decisions
  
ELSE
  LOG_ERROR("Unknown event_type: " + event_type)
  
STORE IN AUDIT_LOG:
  - event_type
  - timestamp
  - routed_to_subdomain
  - status (success/error)
```

---

## Next Steps

**You can now:**

1. ✅ **Test locally** using the Node.js server or webhook.site
2. ✅ **Validate the payload structure** works with your backend
3. ✅ **Verify routing logic** before moving to Zapier

**When ready to go live on Zapier:**
- [Upgrade to Professional](https://zapier.com/app/planbuilder/plans?utm_source=copilot&utm_medium=nudge&utm_campaign=editor_copilot-upgrade-prompt-plan-limitation&plan_required=Professional&conversationId=225ad0f4-82cb-46e9-bacf-2c098c33a9a4&is_copilot_open=true)
- I'll build the complete Zap in the editor
- Replace your local webhook.site URLs with the Zapier hook URL

---

**Questions on the architecture or payloads?** Let me know, or let me know when you're ready to move to building in Zapier.