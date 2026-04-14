# Introduction

## Background

BenefactionPlatform-Ergo is a decentralized fundraising platform built on the Ergo blockchain.  
It combines a SvelteKit frontend, a Node.js/Express backend, ErgoScript smart contracts, and Fleet SDK based wallet/blockchain integration to support transparent and programmable fundraising.

Traditional crowdfunding platforms rely on centralized intermediaries for:

- campaign approval and moderation
- fund custody and payouts
- dispute resolution
- platform fee control

These centralized controls create trust, transparency, and censorship concerns for donors and campaign creators.

## Motivation

The project is motivated by the need for a fundraising system that is:

- transparent by default (on-chain contribution traces)
- programmable (smart contract controlled campaign logic)
- multi-asset aware (ERG and supported tokens)
- wallet-native (no mandatory custodial account model)

The platform also aligns with broader goals in the Ergo ecosystem:

- better usability for real users
- compatibility with common wallet flows
- stronger analytics and operational visibility
- support for referral-based growth incentives

## Existing Systems

Current fundraising models generally fall into:

- **Web2 crowdfunding platforms**: easy onboarding but centralized custody and opaque internal accounting.
- **General DeFi protocols**: powerful primitives but often not designed for campaign lifecycle workflows.
- **Single-chain launchpads**: token launch focused, not always suited for donation or milestone campaigns.

On Ergo specifically, tooling exists for wallets, UTXO smart contracts, and token operations, but complete end-to-end fundraising systems with polished UI + API + analytics are less common.

## Limitations in Existing Approaches

Common limitations observed in existing or baseline implementations:

- limited token flexibility for contributions
- weak anti-abuse handling for referral or incentive systems
- fragmented user experience across wallet providers
- insufficient campaign analytics for contributors and organizers
- deployment complexity across frontend, API, and data layers

## Proposed Solution

BenefactionPlatform-Ergo proposes a full-stack architecture that addresses these gaps:

- **Frontend (SvelteKit)** for responsive campaign discovery, contribution flows, referral validation, and analytics views.
- **Backend (Node/Express + TypeScript)** for API endpoints, validation, aggregation, and integration with persistence.
- **ErgoScript + Fleet SDK integration** for blockchain-aware campaign and contribution interactions.
- **Operational deployment model** compatible with SSR hosting (Netlify/Vercel) and API hosting (Render/Railway).

The outcome is a practical, extensible platform where campaign progress, contribution metrics, and user interactions are modeled in a way that is both blockchain-aware and user-friendly.
