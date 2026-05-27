<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:04090e,100:00ffcc&height=250&section=header&text=AgoraBot%20Intelligence&fontSize=50&fontColor=ffffff&fontAlignY=40&desc=Prediction%20Market%20Trader%20Intelligence%20on%20Arc%20L1&descAlignY=65" width="100%"/>

  [![Hackathon](https://img.shields.io/badge/Hackathon-Agora_Agents-blue?style=for-the-badge)](#)
  [![Settlement](https://img.shields.io/badge/Settlement-Circle_Arc_L1-5c31b8?style=for-the-badge)](#)
  [![Tech](https://img.shields.io/badge/Tech-React_Vite_Tailwind-00ffcc?style=for-the-badge&logo=react)](#)
</div>

# dY"? AgoraBot Intelligence (Agora Agents Hackathon)

**AgoraBot** is an autonomous AI agent built for the **Canteen × Circle × Arc Agora Agents Hackathon**. It is designed specifically to address **RFB 02: Prediction Market Trader Intelligence**.

By continuously ingesting news, sentiment, and Polymarket API data, AgoraBot identifies +EV (Expected Value) opportunities, exposes its reasoning trace, and executes high-frequency, low-latency trades natively on the Arc L1 blockchain, settled instantly in USDC.

---

## dY > The Problem & The RFB 02 Solution

Prediction markets like Polymarket offer powerful aggregation of human knowledge, but humans are too slow to parse thousands of noisy news signals and adjust their positions before the market corrects. 

**AgoraBot** acts as a 24/7 market participant. It:
1. **Finds +EV Bets:** Uses Google Gemini (LLM) to read and contextualize macroeconomic news against current market odds.
2. **Exposes Reasoning:** Emits structured JSON reasoning traces (inspired by the Trading-R1 paper) so users can see *why* an action was taken.
3. **Settles on Arc:** Takes advantage of Arc's sub-second finality and ~$0.01 USDC transaction fees to execute trades that would be unviable on other L1s due to gas costs.

## dY"? System Architecture

```mermaid
graph TD
    %% Styling
    classDef client fill:#050d12,stroke:#00ffcc,stroke-width:2px,color:#fff
    classDef ai fill:#0a0a0a,stroke:#b39ddb,stroke-width:2px,color:#fff
    classDef blockchain fill:#111,stroke:#3b82f6,stroke-width:1px,color:#fff

    %% Nodes
    Dashboard[React Dashboard<br>Live Agent Logs]:::client
    Agent[Agent Node Server<br>Market Scanner & Reasoner]:::ai
    Gemini[Gemini API<br>LLM Heuristics]:::ai
    
    Arc[Arc Testnet L1<br>Circle Wallets API]:::blockchain
    Poly[Prediction Markets<br>Polymarket API]:::blockchain

    %% Relationships
    Agent -->|1. Fetch Market Odds| Poly
    Agent -->|2. Request Analysis| Gemini
    Gemini -->|3. +EV Recommendation & Trace| Agent
    Agent -->|4. Execute Trade (USDC)| Arc
    Agent -->|5. WebSocket Updates| Dashboard
```

## dYS" UI / UX

The project includes a glassmorphism **Agent Dashboard** where users can monitor the agent's autonomous loop.
- **Live Opportunities:** Shows the current markets the agent is evaluating.
- **Reasoning Panel:** Displays the LLM's thought process and EV calculations.
- **Execution Log:** Real-time activity feed showing market scans and Arc L1 transaction hashes.
- **Wallet Panel:** Real-time USDC balance via the Arc Testnet.

## dYO  Traction & Hackathon Viability

While this was built rapidly, the architecture is designed to support the **Builder Code Monetization** mechanism. The agent acts as a builder, recommending trades and earning a micro-fee in USDC for every user that follows its trace. With Arc's minimal fees, this retail-sized copy-trading becomes economically viable.

## dY" Local Development

Ensure you have the ARC CLI installed:
`uv tool install git+https://github.com/the-canteen-dev/ARC-cli`

```bash
# Clone the repo
git clone https://github.com/Raphasha27/agora-intelligence.git
cd agora-intelligence

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

## dY"' Author
**Koketso Raphasha**  
*Autonomous AI Engineer*  
[Portfolio](https://portfolio-iota-eight-90.vercel.app/) | [GitHub](https://github.com/Raphasha27)
