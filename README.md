# Stacks Starter Template

A minimal starter template for building applications on Stacks with Clarity smart contracts and a Next.js frontend. This template provides all the foundational pieces you need to start developing on Stacks in less than 5 minutes.

## Features

- **Minimal Clarity Smart Contract** - Demonstrates core concepts (state, access control, data storage)
- **Next.js 15 Frontend** - Latest Next.js with React 18 and TypeScript
- **Wallet Integration** - Support for Hiro Wallet and Devnet wallets
- **Network Switching** - Easy switching between Mainnet, Testnet, and Devnet
- **Contract Interaction** - Examples of reading and writing to smart contracts
- **Developer Ready** - Pre-configured with testing, linting, and development tools

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18+ and npm
- [Hiro Platform](https://platform.hiro.so) account (for Devnet)
- [Clarinet](https://github.com/hirosystems/clarinet) (recommended)
- [Hiro Wallet](https://wallet.hiro.so/) browser extension (for Mainnet/Testnet)

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd platform-template-starter-dapp
   npm install
   ```

2. **Start Devnet (Hiro Platform)**

   - Log into [Hiro Platform](https://platform.hiro.so)
   - Create or select a project (you can connect to your GitHub account and select this as an existing project or you can choose this as a project template directly from the platform)
   - Start your Devnet instance
   - Copy your API key

3. **Configure environment**

   ```bash
   cd front-end
   cp .env.example .env
   ```

   Add your Hiro Platform API key to `.env`:

   ```
   NEXT_PUBLIC_PLATFORM_HIRO_API_KEY=your-api-key-here
   ```

4. **Deploy contracts to Devnet**

   ```bash
   cd ../clarity
   npm install
   clarinet deployments apply --deployment-plan-path ./deployments/default.devnet-plan.yaml
   ```

5. **Start the development server**

   ```bash
   cd ..
   npm run dev
   ```

   Your app will be running at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
platform-template-starter-dapp/
├── clarity/                    # Smart contracts workspace
│   ├── contracts/              # Clarity smart contracts
│   │   └── starter.clar        # Main contract
│   ├── tests/                  # Contract unit tests
│   ├── deployments/            # Deployment configurations
│   └── README.md              # Contract documentation
├── front-end/                  # Frontend application
│   ├── app/                   # Next.js app directory
│   ├── components/            # React components
│   │   ├── ConnectWallet.tsx # Wallet connection UI
│   │   ├── ContractDemo.tsx  # Contract interaction demo
│   │   └── ...               # Other components
│   ├── lib/                   # Utility functions
│   ├── hooks/                 # Custom React hooks
│   └── constants/             # App constants
├── package.json               # Root package configuration
├── turbo.json                 # Turborepo configuration
└── README.md                  # This file
```

## Development Workflow

### Running Tests

**Contract Tests:**

```bash
cd clarity
npm test
```

**Watch Mode:**

```bash
cd clarity
npm run test:watch
```

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Linting

```bash
npm run lint
```

## Deploying to Testnet

1. **Update contract address** in `front-end/constants/contracts.ts`:

   ```typescript
   export const CONTRACT_ADDRESS = {
     testnet: "ST_YOUR_TESTNET_ADDRESS",
     // ...
   };
   ```

2. **Deploy contract** using Clarinet:

   ```bash
   cd clarity
   clarinet deployments apply --deployment-plan-path ./deployments/default.testnet-plan.yaml
   ```

3. **Update frontend** to use testnet:
   - Select "Testnet" in the network selector
   - Connect with Hiro Wallet

## Deploying to Mainnet

1. **Audit your contracts** - Always have smart contracts audited before mainnet deployment

2. **Update contract address** in `front-end/constants/contracts.ts`

3. **Deploy contract** using your preferred method

4. **Update environment** and deploy frontend to production

## Customization Guide

### Adding New Contract Functions

1. Edit `clarity/contracts/starter.clar`
2. Add tests in `clarity/tests/starter.test.ts`
3. Run tests: `npm test`
4. Update frontend to call new functions

### Modifying the Frontend

- **Components**: Add new components in `front-end/components/`
- **Styling**: Uses Tailwind CSS
- **Contract Calls**: Update `ContractDemo.tsx` with new interactions
- **Networks**: Configure in `front-end/lib/network.ts`

## Common Issues & Solutions

### Devnet Connection Issues

- Ensure your Hiro Platform Devnet is running
- Check that your API key is correctly set in `.env`
- Verify `NEXT_PUBLIC_DEVNET_HOST=platform` in `.env`

### Contract Deployment Fails

- Run `clarinet check` to validate contract syntax
- Ensure you have sufficient STX for deployment
- Check network connectivity

### Wallet Not Connecting

- Ensure wallet extension is installed
- Check that you're on the correct network
- Try refreshing the page

## Resources

- [Stacks Documentation](https://docs.stacks.co)
- [Hiro Documentation](https://docs.hiro.so)
- [Clarity Function Reference](https://docs.stacks.co/reference/functions)
- [Hiro Platform](https://platform.hiro.so)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
