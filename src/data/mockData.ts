import { Product, Coupon, Review, FAQItem, Order } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  // --- AI TOOLS ---
  {
    id: 'prod-ai-1',
    slug: 'chatgpt-plus-subscription',
    name: 'ChatGPT Plus (GPT-4o & Canvas)',
    tagline: 'Supercharged AI intelligence with web browsing, DALL-E 3 & Canvas',
    description: 'Direct activation on your personal OpenAI email with full GPT-4o, Advanced Voice, and Canvas access.',
    fullDescription: 'Get unhindered access to OpenAI’s most powerful intelligence. Experience ultra-fast responses, advanced data analysis, image generation with DALL-E 3, vision capabilities, and the brand-new Canvas workspace for collaborative coding and writing.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    price: 1599,
    originalPrice: 1999,
    discountPercent: 20,
    licenseDuration: '1 Month Subscription',
    deliveryType: 'account_credential',
    deviceCompatibility: ['Web Browser', 'iOS App', 'Android App', 'macOS App', 'Windows App'],
    features: [
      'Access to GPT-4o, GPT-4, and Canvas workspace',
      'Advanced Voice Mode in real-time',
      'DALL-E 3 high-resolution image creation',
      'Custom GPT creation and marketplace access',
      'Web browsing and real-time citation search',
      'Upload and analyze PDF, spreadsheets, and source code'
    ],
    whatsIncluded: [
      'Official subscription credential / direct email upgrade',
      'Step-by-step connection guide',
      '30-day replacement & uptime warranty',
      'Priority WhatsApp & ticket support'
    ],
    activationSteps: [
      'Receive your secure activation credentials or invite link in your dashboard.',
      'Log into chatgpt.com or accept the team workspace invite.',
      'Verify your Plus badge in the bottom-left account settings.',
      'Enjoy full GPT-4o high-speed quota without interruption.'
    ],
    refundPolicy: 'Full refund within 48 hours if subscription fails activation or cannot be verified.',
    rating: 4.9,
    reviewCount: 142,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    badge: 'Best Seller',
    version: 'GPT-4o 2026'
  },
  {
    id: 'prod-ai-2',
    slug: 'midjourney-pro-plan',
    name: 'Midjourney Pro Plan',
    tagline: 'High-speed generative AI image creation with stealth mode',
    description: 'Unlock 30 hours of Fast GPU time, unlimited Relaxed GPU, and private stealth image generation.',
    fullDescription: 'Midjourney Pro is the golden standard for AI image artists, concept designers, and creative directors. Enjoy hyper-realistic 4K renders, stealth generation so your images stay confidential, and simultaneous jobs processing.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    price: 2899,
    originalPrice: 3899,
    discountPercent: 25,
    licenseDuration: '1 Month Subscription',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Discord Web', 'Discord Desktop', 'Discord Mobile', 'Web Gallery'],
    features: [
      '30 Hours Fast GPU generations per month',
      'Unlimited Relax generations',
      'Stealth Mode (hide your artwork from public feeds)',
      '12 Concurrent Fast jobs at once',
      'Commercial usage rights for all created assets',
      'Full Web Alpha gallery access'
    ],
    whatsIncluded: [
      'Dedicated private Discord account or activation token',
      'Immediate access instructions',
      'Complete prompt master guide (PDF)',
      '30-day active warranty'
    ],
    activationSteps: [
      'Check your Tech Store customer dashboard for your Midjourney access details.',
      'Sign into Discord and connect to the Midjourney bot server.',
      'Type `/info` in any private channel to verify active Pro subscription.',
      'Start rendering using `/imagine` with Stealth mode enabled.'
    ],
    refundPolicy: 'Guaranteed 24-hour refund if credentials fail authentication.',
    rating: 4.8,
    reviewCount: 96,
    isTrending: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    badge: 'Trending AI',
    version: 'v6.1'
  },
  {
    id: 'prod-ai-3',
    slug: 'cursor-ai-pro',
    name: 'Cursor AI Pro (Developer IDE)',
    tagline: 'The AI-first code editor built for engineers and architects',
    description: 'Experience intelligent multi-file code editing, Claude 3.5 Sonnet integration, and AI codebase indexing.',
    fullDescription: 'Built on a fork of VS Code, Cursor is the revolutionary code editor that understands your entire repository. Autocomplete across multiple files, debug complex stack traces with a single prompt, and refactor whole architectures seamlessly.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    licenseDuration: '1 Year License',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 10/11', 'macOS (Intel/Apple Silicon)', 'Linux'],
    features: [
      'Unlimited fast requests to Claude 3.5 Sonnet & GPT-4o',
      'Full codebase semantic indexing & search',
      'Multi-file edit suggestions (Composer mode)',
      'Predictive terminal commands & auto-debug',
      'Compatible with all VS Code extensions',
      'Zero telemetry & SOC2 compliant security'
    ],
    whatsIncluded: [
      'Official Cursor Pro activation key / account credentials',
      'Instant download links for macOS, Windows & Linux',
      'Setup & shortcut cheat sheet',
      'Annual warranty and automated renewals'
    ],
    activationSteps: [
      'Download and install Cursor IDE from the download link provided in your order confirmation.',
      'Go to Settings -> Account -> Login with provided Pro account.',
      'Confirm the Pro badge is active in the top navigation bar.',
      'Open your project and press Cmd+K / Ctrl+K to start coding with AI.'
    ],
    refundPolicy: 'Full refund within 72 hours if license activation fails.',
    rating: 5.0,
    reviewCount: 78,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Developer Choice',
    version: 'v0.42+'
  },
  {
    id: 'prod-ai-4',
    slug: 'perplexity-pro-1year',
    name: 'Perplexity Pro — 1 Year Access',
    tagline: 'The definitive conversational search engine with multi-model AI',
    description: 'Unlock 300+ daily Pro queries with Claude 3.5 Sonnet, GPT-4o, Sonar Large, and deep research file analysis.',
    fullDescription: 'Perplexity Pro replaces traditional search engines with definitive, citation-backed answers. Upload PDFs, analyze datasets, and switch dynamically between frontier models for the most accurate technical answers.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    licenseDuration: '1 Year Access',
    deliveryType: 'account_credential',
    deviceCompatibility: ['Web Browser', 'iOS App', 'Android App', 'Chrome Extension'],
    features: [
      '300+ Pro Searches per day with Claude 3.5 Sonnet & GPT-4o',
      'Unlimited file uploads and deep document analysis',
      'Generate stunning AI visuals with Playground & FLUX.1',
      'Private Collections with customized AI prompts',
      'Real-time live web citations and academic source filters',
      'Dedicated iOS & Android widget support'
    ],
    whatsIncluded: [
      'Perplexity Pro direct credential upgrade',
      'Comprehensive research guide',
      '12-month full service guarantee',
      'Email & WhatsApp priority help'
    ],
    activationSteps: [
      'Copy the credentials from your Tech Store Customer Dashboard.',
      'Go to perplexity.ai and sign in with the provided details.',
      'Navigate to Settings to confirm the Pro subscription status.',
      'Toggle Pro Search on the homepage and start deep research.'
    ],
    refundPolicy: 'Full refund within 48 hours upon verification of any access issue.',
    rating: 4.9,
    reviewCount: 63,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular',
    version: 'Pro 2026'
  },
  {
    id: 'prod-ai-5',
    slug: 'claude-pro-anthropic',
    name: 'Claude Pro (Anthropic Claude 3.5 Sonnet & Opus)',
    tagline: '5x higher usage limits, interactive Artifacts workspace & code analysis',
    description: 'Direct activation on your personal Anthropic account email with priority Claude 3.5 Sonnet access.',
    fullDescription: 'Unlock Anthropic’s most intelligent reasoning model. Experience unmatched code generation, document parsing up to 200K tokens, and live interactive Artifacts for instant frontend rendering and prototyping.',
    category: 'ai-tools',
    categoryName: 'AI Tools',
    price: 1799,
    originalPrice: 2499,
    discountPercent: 28,
    licenseDuration: '1 Month Subscription',
    deliveryType: 'account_credential',
    deviceCompatibility: ['Web Browser', 'iOS App', 'Android App', 'Claude Desktop'],
    features: [
      '5x more usage of Claude 3.5 Sonnet & Claude 3 Opus',
      'Interactive visual Artifacts code & UI workspace',
      'Projects feature to organize custom documents and instructions',
      '200,000 token context window analysis',
      'Priority access during peak traffic times',
      'Direct email invitation on your personal account'
    ],
    whatsIncluded: [
      'Official subscription invitation / credentials',
      'Full setup guide',
      '30-day active warranty and replacement guarantee',
      'Direct WhatsApp concierge support'
    ],
    activationSteps: [
      'Open your order confirmation vault to copy your access details.',
      'Sign into claude.ai or accept the email workspace invitation.',
      'Verify the Pro badge in your account settings.',
      'Enjoy 5x higher messaging quota with Claude 3.5 Sonnet.'
    ],
    refundPolicy: 'Full refund within 48 hours if subscription fails activation.',
    rating: 5.0,
    reviewCount: 88,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    badge: 'Editor Choice',
    version: 'Claude 3.5'
  },

  // --- SOFTWARE ---
  {
    id: 'prod-soft-1',
    slug: 'adobe-creative-cloud-all-apps',
    name: 'Adobe Creative Cloud — All Apps',
    tagline: '20+ creative applications including Photoshop, Premiere Pro & Illustrator',
    description: 'Official individual subscription assigned directly to your own personal Adobe account email.',
    fullDescription: 'Supercharge your creative workflow with the complete suite of industry-standard creative tools. From Photoshop and Illustrator to Premiere Pro, After Effects, and Substance 3D, plus 100GB cloud storage and Adobe Fonts.',
    category: 'design-productivity',
    categoryName: 'Design & Productivity',
    price: 4999,
    originalPrice: 9999,
    discountPercent: 50,
    licenseDuration: '1 Year Subscription',
    deliveryType: 'account_credential',
    deviceCompatibility: ['Windows 10/11', 'macOS (Intel & M-Series)', 'iPadOS'],
    features: [
      '20+ Creative Cloud desktop applications',
      'Full Photoshop, Illustrator, InDesign, Premiere Pro, After Effects',
      'Firefly Generative AI credits included monthly',
      '100GB of secure Adobe Cloud Storage',
      'Access to 20,000+ Adobe Fonts and Behance Pro',
      'Install on 2 active devices simultaneously'
    ],
    whatsIncluded: [
      'Direct invitation to your existing Adobe email ID',
      'Official download links via Adobe Creative Cloud desktop app',
      'Full updates throughout the entire 12-month period',
      '1-Year replacement and support guarantee'
    ],
    activationSteps: [
      'Enter your Adobe email during checkout or submit it in the order notes.',
      'Check your inbox for an official invitation email from Adobe Creative Cloud.',
      'Accept the invitation and select Tech Store Enterprise/Team profile.',
      'Open the Creative Cloud app on your PC or Mac and download any software.'
    ],
    refundPolicy: '100% refund if the invitation is not delivered within 2 hours or cannot be activated.',
    rating: 4.9,
    reviewCount: 312,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80',
    badge: '50% OFF',
    version: 'CC 2025/2026'
  },
  {
    id: 'prod-design-1',
    slug: 'canva-pro-1year-upgrade',
    name: 'Canva Pro — 1 Year Personal Upgrade',
    tagline: '100M+ premium assets, brand kits & Magic Studio AI design tools',
    description: 'Instant upgrade for your personal Canva email. Unlimited background remover, magic resize, and premium templates.',
    fullDescription: 'Unleash your creativity with Canva Pro. Access over 100 million premium photos, videos, graphics, audio tracks, and thousands of premium fonts. Effortlessly remove backgrounds with one click, resize designs for any social platform, and manage multiple brand kits.',
    category: 'design-productivity',
    categoryName: 'Design & Productivity',
    price: 1299,
    originalPrice: 2499,
    discountPercent: 48,
    licenseDuration: '1 Year Subscription',
    deliveryType: 'account_credential',
    deviceCompatibility: ['Web Browser', 'iOS App', 'Android App', 'macOS App', 'Windows App'],
    features: [
      '100M+ premium photos, videos, graphics and audio',
      'One-click Background Remover for images and videos',
      'Magic Switch to instantly resize and translate designs',
      'Unlimited Brand Kits with custom logos, colors, and fonts',
      '1TB cloud storage for team designs and assets',
      'Schedule social media content directly from Canva'
    ],
    whatsIncluded: [
      'Direct email invitation to your existing Canva account',
      'Step-by-step acceptance instructions',
      '1-Year replacement and uptime warranty',
      'Instant WhatsApp assistance'
    ],
    activationSteps: [
      'Enter your Canva email address during checkout.',
      'Check your email for the official Canva team invitation link.',
      'Accept the invite and switch to the Pro team workspace.',
      'Enjoy full Canva Pro features across all your devices.'
    ],
    refundPolicy: '100% refund if the invitation is not delivered within 2 hours.',
    rating: 4.9,
    reviewCount: 245,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Best Seller',
    version: 'Pro 2026'
  },
  {
    id: 'prod-soft-2',
    slug: 'jetbrains-all-products-pack',
    name: 'JetBrains All Products Pack',
    tagline: 'IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm, Rider & more',
    description: 'Complete suite of 16 professional IDEs and 10 extensions for software engineers and architects.',
    fullDescription: 'The premier IDE suite for every modern language and framework. Whether you write Java, Kotlin, Python, TypeScript, C#, Go, or Rust, JetBrains delivers unmatched refactoring, debugging, and code inspections.',
    category: 'development-tools',
    categoryName: 'Development Tools',
    price: 3999,
    originalPrice: 7999,
    discountPercent: 50,
    licenseDuration: '1 Year Commercial',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 10/11', 'macOS', 'Linux'],
    features: [
      'Includes IntelliJ IDEA Ultimate, WebStorm, PyCharm Pro, Rider, GoLand, CLion, DataGrip',
      'Smart code completion, inspections, and refactorings',
      'Database client & SQL tools built-in',
      'Git & VCS deep integration',
      'Remote development & code with me capabilities',
      'Supports all official JetBrains plugins'
    ],
    whatsIncluded: [
      'Genuine JetBrains activation key / license certificate',
      'Direct download links from JetBrains Toolbox',
      '1 Year continuous free version upgrades',
      '24/7 dedicated support'
    ],
    activationSteps: [
      'Open your customer dashboard to copy your JetBrains License Key.',
      'Download and launch JetBrains Toolbox or individual IDE.',
      'Click Help -> Register -> Select "Activation Code" or "JB Account".',
      'Paste the key and click Activate. Enjoy uninterrupted coding.'
    ],
    refundPolicy: 'Full money back within 7 days if license validation fails.',
    rating: 5.0,
    reviewCount: 115,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular Dev',
    version: '2025.3'
  },
  {
    id: 'prod-dev-1',
    slug: 'github-copilot-pro-1year',
    name: 'GitHub Copilot Pro (1 Year Commercial Access)',
    tagline: 'Your AI pair programmer across VS Code, JetBrains & Neovim',
    description: 'Direct activation on your personal GitHub account. Unlimited inline code suggestions, chat, and CLI assistance.',
    fullDescription: 'GitHub Copilot uses the OpenAI and Claude models to suggest code and entire functions in real time, right from your editor. Trained on billions of lines of public code, Copilot turns natural language prompts into working software and explains unfamiliar syntax.',
    category: 'development-tools',
    categoryName: 'Development Tools',
    price: 1699,
    originalPrice: 2999,
    discountPercent: 43,
    licenseDuration: '1 Year License',
    deliveryType: 'account_credential',
    deviceCompatibility: ['VS Code', 'JetBrains IDEs', 'Neovim', 'GitHub Mobile', 'Visual Studio'],
    features: [
      'Unlimited inline autocomplete suggestions in 30+ languages',
      'Copilot Chat in sidebar for architecture and debugging questions',
      'Multi-model support: switch between GPT-4o and Claude 3.5 Sonnet',
      'Terminal and CLI commands generator (gh copilot)',
      'Security vulnerability filtering built-in',
      'Zero training on your private repositories'
    ],
    whatsIncluded: [
      'Direct invitation to your GitHub account / username',
      'Activation guide for VS Code and JetBrains',
      '1 Year full active warranty',
      'Priority customer assistance'
    ],
    activationSteps: [
      'Provide your GitHub username during checkout.',
      'Check your GitHub email or notifications for the invitation.',
      'Accept the invitation to activate Copilot Pro.',
      'Install the GitHub Copilot extension in VS Code and log in.'
    ],
    refundPolicy: 'Full refund within 48 hours if invitation cannot be delivered.',
    rating: 4.9,
    reviewCount: 162,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    badge: 'Essential Dev',
    version: 'Copilot Pro'
  },
  {
    id: 'prod-soft-3',
    slug: 'davinci-resolve-studio-19',
    name: 'DaVinci Resolve Studio 19',
    tagline: 'Hollywood’s #1 post production editing, color, VFX & audio suite',
    description: 'Permanent lifetime activation key for DaVinci Resolve Studio with Neural Engine AI and 8K support.',
    fullDescription: 'DaVinci Resolve Studio 19 is the world’s only solution that combines professional 8K editing, color correction, visual effects, and audio post production in a single software tool. Includes the revolutionary DaVinci Neural Engine with magic mask, voice isolation, and smart reframing.',
    category: 'video-editing',
    categoryName: 'Video Editing Software',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    licenseDuration: 'Lifetime Activation',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 10/11', 'macOS (Apple Silicon & Intel)', 'Linux'],
    features: [
      'Permanent Studio license with free version upgrades',
      'DaVinci Neural Engine AI tools (Voice Isolation, Magic Mask, Speed Warp)',
      'Hardware accelerated encoding for H.264/H.265/AV1 up to 120fps',
      'Immersive audio with Fairlight 3D spatial sound',
      'Advanced stereoscopic 3D and HDR grading tools',
      'Up to 2 PCs/Macs activated simultaneously'
    ],
    whatsIncluded: [
      'Genuine 16-digit Studio activation serial key',
      'Official Blackmagic Design download portal link',
      'Video editor keyboard shortcut cheat sheet',
      'Lifetime activation guarantee'
    ],
    activationSteps: [
      'Download DaVinci Resolve Studio 19 from the official Blackmagic Design link.',
      'Run the installer and launch DaVinci Resolve Studio.',
      'Enter the 16-digit license serial from your order confirmation screen.',
      'Click Register to permanently unlock Studio features.'
    ],
    refundPolicy: '100% refund within 7 days if the key does not activate.',
    rating: 4.9,
    reviewCount: 84,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Lifetime',
    version: 'Studio 19'
  },
  {
    id: 'prod-video-1',
    slug: 'final-cut-pro-master-fx-suite',
    name: 'Final Cut Pro Motion & VFX Master Suite',
    tagline: '500+ cinematic titles, transitions, 3D camera moves & color LUTs',
    description: 'Universal plugin pack for Apple Final Cut Pro and Apple Motion. Optimized for Apple Silicon M1/M2/M3/M4 Macs.',
    fullDescription: 'Elevate your video editing on macOS with this studio-grade collection of motion plugins, dynamic zoom transitions, kinetic typography titles, and 3D device mockups. Built natively with Apple Motion templates for lightning-fast rendering without proxy bottlenecks.',
    category: 'video-editing',
    categoryName: 'Video Editing Software',
    price: 1199,
    originalPrice: 2499,
    discountPercent: 52,
    licenseDuration: 'Lifetime Commercial License',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Final Cut Pro 10.6+', 'Apple Motion 5.6+', 'macOS Sonoma / Sequoia'],
    features: [
      '500+ drag-and-drop Motion templates',
      'Kinetic titles, lower thirds, and callout boxes',
      'Seamless optical zoom, glitch, and whip transitions',
      'Optimized for Apple Silicon hardware acceleration',
      'Royalty-free commercial monetization license',
      'One-click installer with automatic Motion templates folder sync'
    ],
    whatsIncluded: [
      'High-speed direct download link with installer',
      'Video walkthrough on installation and usage',
      'Commercial usage certificate',
      'Lifetime update guarantee'
    ],
    activationSteps: [
      'Download the installer package from your customer order dashboard.',
      'Double click the `.pkg` installer to sync templates into Motion Templates.',
      'Open Final Cut Pro and navigate to Titles and Generators.',
      'Drag and drop any effect directly onto your timeline.'
    ],
    refundPolicy: 'Full money-back guarantee within 48 hours if files fail to load.',
    rating: 4.9,
    reviewCount: 71,
    isTrending: false,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Mac Studio',
    version: '2026 Edition'
  },
  {
    id: 'prod-soft-4',
    slug: 'internet-download-manager-lifetime',
    name: 'Internet Download Manager (IDM)',
    tagline: '5x faster downloads with smart schedule and video grabber',
    description: 'Genuine official lifetime retail license key for 1 PC with free updates for 3 years.',
    fullDescription: 'IDM is the world-renowned download accelerator. It features a smart download logic accelerator that features intelligent dynamic file segmentation and safe multipart downloading technology to accelerate your downloads by up to 5 times.',
    category: 'digital-products',
    categoryName: 'Digital Products',
    price: 999,
    originalPrice: 1599,
    discountPercent: 37,
    licenseDuration: 'Lifetime 1 PC',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 11', 'Windows 10', 'Windows 8.1', 'Windows 7'],
    features: [
      'Up to 500% download acceleration with dynamic segmentation',
      'One-click video download panel for Chrome, Edge, and Firefox',
      'Automatic resume for broken and paused downloads',
      'Built-in antivirus checking upon download completion',
      'Scheduled downloads with automated queue management',
      'Official direct registration with Tonec Inc.'
    ],
    whatsIncluded: [
      'Official 20-digit retail registration key',
      'Direct download link for the latest IDM build',
      'Browser extension setup guide',
      'Lifetime registration guarantee'
    ],
    activationSteps: [
      'Install IDM from the official setup link in your order vault.',
      'Open IDM -> Registration -> Enter your name, email, and provided serial.',
      'Click OK. Verify the registration shows activated under Help -> About.'
    ],
    refundPolicy: 'Instant refund within 48 hours if serial fails activation.',
    rating: 4.8,
    reviewCount: 204,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular Utility',
    version: 'v6.42'
  },

  // --- WINDOWS KEYS ---
  {
    id: 'prod-win-1',
    slug: 'windows-11-pro-retail-license',
    name: 'Windows 11 Pro Genuine Retail Key',
    tagline: 'Official digital license with instant online Microsoft activation',
    description: 'Genuine Retail product key for Windows 11 Professional (32/64 bit). Transferable and permanent.',
    fullDescription: 'Upgrade or clean install to Microsoft’s most secure and responsive operating system. Windows 11 Pro provides enterprise-grade BitLocker encryption, Windows Sandbox, Remote Desktop server, Hyper-V virtualization, and seamless AI Copilot integration.',
    category: 'windows-keys',
    categoryName: 'Windows Keys',
    price: 699,
    originalPrice: 1999,
    discountPercent: 65,
    licenseDuration: 'Permanent / 1 PC (Transferable)',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['PC / Laptop with TPM 2.0 & SecureBoot', 'Compatible with 64-bit Systems'],
    features: [
      'Official Microsoft online direct server activation',
      'BitLocker device encryption & Windows Information Protection',
      'Windows Sandbox for running untested software safely',
      'Remote Desktop host functionality',
      'Hyper-V hardware-based virtualization support',
      'Supports lifetime free Microsoft security and feature updates'
    ],
    whatsIncluded: [
      '1x Genuine 25-character Retail product key (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)',
      'Official Microsoft Windows 11 ISO / Media Creation Tool download link',
      'Step-by-step clean installation and upgrade guide',
      '100% activation guarantee or immediate key replacement'
    ],
    activationSteps: [
      'Copy the 25-character key instantly generated in your order dashboard.',
      'On your PC, open Settings -> System -> Activation.',
      'Click "Change product key" and paste your 25-digit key.',
      'Click "Next" -> "Activate". Your system is permanently activated with a digital license linked to your motherboard.'
    ],
    refundPolicy: '100% money-back guarantee if the key fails activation and cannot be validated by Microsoft servers.',
    rating: 4.9,
    reviewCount: 680,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    badge: 'Best Value',
    version: 'Retail 64-Bit'
  },
  {
    id: 'prod-win-2',
    slug: 'microsoft-office-2021-pro-plus',
    name: 'Microsoft Office 2021 Professional Plus',
    tagline: 'Permanent bindable license linked directly to your Microsoft account',
    description: 'Includes Word, Excel, PowerPoint, Outlook, Access, Publisher, and OneNote for 1 PC.',
    fullDescription: 'The classic suite of productivity tools without monthly subscription fees. This official bindable key attaches directly to your personal Microsoft Account (account.microsoft.com) so you can reinstall anytime even if you change hard drives.',
    category: 'microsoft-office',
    categoryName: 'Microsoft Office',
    price: 1199,
    originalPrice: 2999,
    discountPercent: 60,
    licenseDuration: 'Lifetime / Account Bindable',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 10', 'Windows 11'],
    features: [
      'Official redeem via setup.office.com',
      'Permanent bind to your personal Microsoft account',
      'Full versions of Word, Excel, PowerPoint, Outlook, Access, Publisher',
      'Dynamic arrays & XLOOKUP in Excel',
      'Enhanced recording and laser pointer in PowerPoint',
      'No annual subscription or recurring payments'
    ],
    whatsIncluded: [
      '25-digit official product redemption code',
      'Direct link to setup.office.com',
      'Detailed installation guide with screenshots',
      'Lifetime activation warranty'
    ],
    activationSteps: [
      'Go to https://setup.office.com and sign in with your Microsoft account.',
      'Enter the 25-character key from your Tech Store order confirmation.',
      'Select your language and country, then click Redeem.',
      'Download the installer directly from your Microsoft Services page.'
    ],
    refundPolicy: '100% refund if code fails redemption on setup.office.com.',
    rating: 4.9,
    reviewCount: 420,
    isTrending: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    badge: 'Account Bindable',
    version: 'Office 2021 Pro Plus'
  },
  {
    id: 'prod-office-1',
    slug: 'microsoft-office-2024-pro-plus',
    name: 'Microsoft Office 2024 Professional Plus',
    tagline: 'Latest perpetual Office release with enhanced performance and modern UI',
    description: 'Permanent activation key bindable to setup.office.com. Word, Excel, PowerPoint, Outlook, OneNote, and Access.',
    fullDescription: 'Experience the newest perpetual release of Microsoft Office. Built for professionals who need powerful desktop apps without subscription lock-in. Features dynamic charts, automated translation, accessibility improvements, and OpenDocument Format (ODF) 1.4 support.',
    category: 'microsoft-office',
    categoryName: 'Microsoft Office',
    price: 1499,
    originalPrice: 3499,
    discountPercent: 57,
    licenseDuration: 'Lifetime / Account Bindable',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 11', 'Windows 10'],
    features: [
      'Official redemption via https://setup.office.com',
      'Permanently linked to your Microsoft account',
      'Latest Office 2024 UI with fluid design and dark mode',
      'Advanced Excel functions: TEXTBEFORE, TEXTAFTER, CHOOSEROWS, VSTACK',
      'Seamless multi-device document co-authoring',
      'No recurring monthly or yearly fees'
    ],
    whatsIncluded: [
      '25-digit official product redemption code',
      'Official Microsoft CDN download link',
      'Complete installation and activation guide',
      'Lifetime activation guarantee'
    ],
    activationSteps: [
      'Navigate to setup.office.com and sign in with your Microsoft account.',
      'Enter the 25-digit code generated in your order confirmation.',
      'Select your language and region, then confirm.',
      'Download and run the official installer from account.microsoft.com.'
    ],
    refundPolicy: '100% money-back guarantee if code fails redemption on setup.office.com.',
    rating: 5.0,
    reviewCount: 198,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    badge: '2024 Release',
    version: 'Office 2024 Pro Plus'
  },
  {
    id: 'prod-sec-1',
    slug: 'bitdefender-total-security-3-devices',
    name: 'Bitdefender Total Security — 3 Devices (1 Year)',
    tagline: 'Complete next-gen protection against malware, ransomware & zero-day attacks',
    description: 'Official 1-Year license for 3 devices. Protects Windows, macOS, Android, and iOS with multi-layer defense.',
    fullDescription: 'Ranked #1 by AV-TEST and AV-Comparatives. Bitdefender Total Security provides unbeatable threat detection without slowing down your system. Includes advanced behavioral monitoring, secure online banking browser, webcam and microphone privacy protection, and a parental control module.',
    category: 'antivirus-security',
    categoryName: 'Antivirus & Security',
    price: 899,
    originalPrice: 1999,
    discountPercent: 55,
    licenseDuration: '1 Year / 3 Devices',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 11/10', 'macOS', 'Android', 'iOS'],
    features: [
      'Protects 3 devices simultaneously for a full 12 months',
      'Multi-layer ransomware protection with automated file rollback',
      'Network Threat Prevention to block exploits and brute-force attacks',
      'Bitdefender VPN with 200MB/day encrypted traffic',
      'SafePay dedicated browser for secure payments and banking',
      'Zero system performance impact with Photon technology'
    ],
    whatsIncluded: [
      'Official Bitdefender Central activation code',
      'Direct setup link to central.bitdefender.com',
      'Installation guide for PC, Mac, and Mobile',
      '1-Year activation guarantee'
    ],
    activationSteps: [
      'Go to central.bitdefender.com and log in or create an account.',
      'Click "Activate a service with code" in the left sidebar.',
      'Paste your license key from Tech Store and confirm.',
      'Download the installer directly onto your protected devices.'
    ],
    refundPolicy: '100% refund within 48 hours if code fails activation on Bitdefender Central.',
    rating: 4.9,
    reviewCount: 176,
    isTrending: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    badge: 'Top Rated',
    version: '2026 Edition'
  },
  {
    id: 'prod-sec-2',
    slug: 'kaspersky-plus-security-1-year',
    name: 'Kaspersky Plus Total Security — 1 Device (1 Year)',
    tagline: 'Advanced cybersecurity, unlimited high-speed VPN & performance optimizer',
    description: 'Official 1-Year retail license for 1 PC/Mac. Real-time virus protection, anti-phishing, and data leak detector.',
    fullDescription: 'Upgrade your digital defenses with Kaspersky Plus. Combining award-winning anti-malware defense with premium performance tools including registry cleaner, duplicate file remover, and an unlimited high-speed VPN for unrestricted private browsing.',
    category: 'antivirus-security',
    categoryName: 'Antivirus & Security',
    price: 699,
    originalPrice: 1499,
    discountPercent: 53,
    licenseDuration: '1 Year / 1 Device',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 11/10', 'macOS', 'Android'],
    features: [
      'Real-time proactive anti-malware and zero-day defense',
      'Unlimited Fast VPN for anonymous and secure browsing',
      'Data Leak Checker to monitor if your passwords are compromised',
      'Hard Drive Health Monitor and PC optimizer tools',
      'Payment Protection with Encrypted Browser vault',
      'Automatic daily cloud database signature updates'
    ],
    whatsIncluded: [
      'Genuine 20-character Kaspersky activation serial key',
      'Official My Kaspersky download portal link',
      'Step-by-step activation guide',
      '1-Year validity guarantee'
    ],
    activationSteps: [
      'Install Kaspersky Plus using the official download link provided.',
      'Launch the application and click "Enter activation code".',
      'Paste your 20-character key from your Tech Store dashboard.',
      'Click "Activate" to initiate the 1-year security entitlement.'
    ],
    refundPolicy: 'Full refund within 48 hours if code fails verification.',
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Best Value',
    version: 'Kaspersky Plus'
  },
  {
    id: 'prod-win-3',
    slug: 'windows-10-pro-retail-key',
    name: 'Windows 10 Pro Genuine Retail Key',
    tagline: 'Rock-solid OS activation with free upgrade path to Windows 11',
    description: 'Permanent activation for Windows 10 Professional. Eligible for free upgrade to Windows 11 anytime.',
    fullDescription: 'The world’s most widely deployed operating system, trusted by millions of developers, gamers, and businesses. Features BitLocker encryption, Remote Desktop, and full access to Microsoft Store apps.',
    category: 'windows-keys',
    categoryName: 'Windows Keys',
    price: 599,
    originalPrice: 1499,
    discountPercent: 60,
    licenseDuration: 'Permanent / 1 PC',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Windows 10 32-bit & 64-bit'],
    features: [
      'Instant online activation directly through Microsoft',
      'BitLocker drive encryption for full privacy',
      'Group Policy management and Domain Join',
      'Eligible for free Windows 11 upgrade',
      'No expiration date'
    ],
    whatsIncluded: [
      '1x Genuine 25-character retail key',
      'Official Microsoft Media Creation Tool download link',
      'Upgrade instructions from Windows 10 Home to Pro',
      'Full replacement warranty'
    ],
    activationSteps: [
      'Open Settings -> Update & Security -> Activation.',
      'Click Change product key.',
      'Enter the key provided in your order vault.',
      'Restart your computer if prompted to complete activation.'
    ],
    refundPolicy: 'Full refund if the key does not activate online.',
    rating: 4.8,
    reviewCount: 389,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
    badge: 'Popular',
    version: 'Retail 32/64-Bit'
  },

  // --- DIGITAL PRODUCTS ---
  {
    id: 'prod-dig-1',
    slug: 'cyberpunk-ui-kit-figma-react',
    name: 'Cyberpunk & Futuristic UI Kit (Figma + React)',
    tagline: '140+ premium components, HUD elements & 3D WebGL scenes',
    description: 'The ultimate design system for Web3, gaming, AI interfaces, and cyberpunk web applications.',
    fullDescription: 'Craft breathtaking futuristic interfaces in minutes. Includes over 140 meticulously designed components in Figma with auto-layout 5.0, paired with drop-in React & Tailwind CSS components, Three.js shaders, and glowing HUD elements.',
    category: 'digital-products',
    categoryName: 'Digital Products',
    price: 1499,
    originalPrice: 2999,
    discountPercent: 50,
    licenseDuration: 'Commercial Developer License',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Figma Web/Desktop', 'React 18/19', 'Next.js', 'Tailwind CSS'],
    features: [
      '140+ Production-ready Figma components with auto-layout',
      'React & Tailwind CSS code repository with live demos',
      'Interactive Three.js particle backgrounds & holo-rings',
      'Custom cyberpunk icon pack (200+ SVG icons)',
      'Dark and neon color tokens with design tokens JSON',
      'Unlimited client and commercial project usage'
    ],
    whatsIncluded: [
      'Direct Figma community file invite / `.fig` source download',
      'GitHub repository private access or ZIP with full React source',
      'Video walkthrough on customizing themes and shaders',
      'Free lifetime component updates'
    ],
    activationSteps: [
      'Download the source ZIP and access the private GitHub repo link from your customer dashboard.',
      'Import the `.fig` file into your Figma workspace.',
      'Run `npm install` in the React project directory to launch the component gallery.',
      'Copy components directly into your Next.js or React application.'
    ],
    refundPolicy: 'Full refund within 24 hours if download files are corrupted or incomplete.',
    rating: 4.9,
    reviewCount: 54,
    isTrending: true,
    isFeatured: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Exclusive',
    version: 'v2.4'
  },
  {
    id: 'prod-dig-2',
    slug: 'creator-master-bundle-luts-sfx',
    name: '10,000+ Creator Master Bundle (LUTs, SFX & Overlays)',
    tagline: 'Cinema-grade color grading presets, 4K overlays and cinematic audio',
    description: 'Transform your videos into cinematic masterpieces with Hollywood-inspired LUTs and lossless sound effects.',
    fullDescription: 'Specially curated for filmmakers, YouTubers, and content creators. Includes 4,500+ cinema LUTs compatible with Premiere, Final Cut, and DaVinci Resolve, 3,000+ lossless cinematic sound effects, 2,500+ 4K light leaks, film grains, and transition overlays.',
    category: 'digital-products',
    categoryName: 'Digital Products',
    price: 899,
    originalPrice: 2499,
    discountPercent: 64,
    licenseDuration: 'Lifetime Royalty-Free',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'CapCut PC/Mac'],
    features: [
      '4,500+ Cinema LUTs (.cube files for Rec.709, LOG, D-Log)',
      '3,000+ High-definition 24-bit 48kHz WAV sound effects',
      '2,500+ 4K Prores film grains, lens flares, and dust overlays',
      'Royalty-free commercial license for YouTube, commercial ads & TV',
      'High-speed Google Drive and AWS S3 direct download links',
      'Organized in structured categorical folders'
    ],
    whatsIncluded: [
      'Permanent high-speed cloud drive download link',
      'Installation guide for Premiere, DaVinci, FCPX, and CapCut',
      'Royalty-free certificate for commercial usage',
      'Lifetime download re-access from customer dashboard'
    ],
    activationSteps: [
      'Open your Tech Store order confirmation page.',
      'Click the secure download button to access the high-speed cloud drive.',
      'Unzip the package and load `.cube` files into your video editing software.',
      'Apply LUTs with a single click and adjust intensity to taste.'
    ],
    refundPolicy: 'Full money-back guarantee if download links are inaccessible.',
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Creator Bundle',
    version: '2026 Edition'
  },
  {
    id: 'prod-dig-3',
    slug: 'saas-enterprise-boilerplate-nextjs',
    name: 'Full-Stack SaaS Boilerplate (Next.js 14 + Supabase)',
    tagline: 'Production-ready codebase with Auth, Stripe/Razorpay, RLS & Admin Panel',
    description: 'Save 200+ hours of engineering. Ship your software-as-a-service application in days instead of months.',
    fullDescription: 'The comprehensive foundation for modern web applications. Featuring Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase Auth with Row Level Security, transactional emails with Resend, Razorpay/Stripe billing, and an admin telemetry dashboard.',
    category: 'digital-products',
    categoryName: 'Digital Products',
    price: 2199,
    originalPrice: 4999,
    discountPercent: 56,
    licenseDuration: 'Unlimited Projects License',
    deliveryType: 'instant_automated',
    deviceCompatibility: ['Node.js 18+', 'Vercel', 'Docker', 'AWS / Cloudflare'],
    features: [
      'Next.js 14 App Router with Server Actions & TypeScript',
      'Supabase database schemas, RLS policies, and migrations',
      'Pre-built Razorpay & Stripe subscription and webhook integration',
      'Email templates with React Email and Resend',
      'Full authentication with Magic Links, OAuth, and MFA',
      'Admin dashboard with user analytics and subscription management'
    ],
    whatsIncluded: [
      'GitHub repository invite & private access',
      'Complete documentation with 1-click Vercel deploy button',
      'Comprehensive architecture diagrams',
      'Lifetime updates via GitHub releases'
    ],
    activationSteps: [
      'Provide your GitHub username during checkout or enter it in your customer dashboard.',
      'Receive the automated invitation to the private repository.',
      'Clone the repository and run `npm install` and `npm run dev`.',
      'Follow the 5-minute setup checklist in `README.md` to deploy live.'
    ],
    refundPolicy: '24-hour refund if repository cannot be accessed.',
    rating: 5.0,
    reviewCount: 41,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Architect Choice',
    version: 'v3.2'
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'TECH20',
    description: 'Get flat 20% off on your entire digital order',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 999,
    maxDiscount: 1000,
    validUntil: '2026-12-31',
    isActive: true,
    usageCount: 230
  },
  {
    id: 'coup-2',
    code: 'WELCOME10',
    description: 'Extra 10% discount for first-time customers',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 500,
    validUntil: '2026-12-31',
    isActive: true,
    usageCount: 450
  },
  {
    id: 'coup-3',
    code: 'SAVE500',
    description: 'Flat ₹500 off on premium software bundles',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 2500,
    validUntil: '2026-12-31',
    isActive: true,
    usageCount: 88
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-win-1',
    productName: 'Windows 11 Pro Genuine Retail Key',
    authorName: 'Vikram Mehta',
    rating: 5,
    title: 'Instant activation within 30 seconds!',
    comment: 'Was hesitant about digital keys, but Tech Store exceeded all expectations. Key arrived instantly on the success screen and via email. Windows 11 Pro activated right away without any phone activation nonsense.',
    date: '2026-10-18',
    isVerifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-2',
    productId: 'prod-ai-3',
    productName: 'Cursor AI Pro (Developer IDE)',
    authorName: 'Ananya Sharma',
    rating: 5,
    title: 'Supercharged my development velocity',
    comment: 'Cursor Pro is unbelievable. Smooth setup, instant access, and Claude 3.5 Sonnet integration works like magic. Best tech investment for our startup this year.',
    date: '2026-10-24',
    isVerifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-3',
    productId: 'prod-soft-1',
    productName: 'Adobe Creative Cloud — All Apps',
    authorName: 'Rohan Deshmukh',
    rating: 5,
    title: 'Activated on my existing Adobe ID smoothly',
    comment: 'I was invited to the Creative Cloud team within 25 minutes of payment. All 20+ apps unlocked including Firefly generative credits. Great customer support on WhatsApp too.',
    date: '2026-11-02',
    isVerifiedPurchase: true,
    isApproved: true
  },
  {
    id: 'rev-4',
    productId: 'prod-soft-3',
    productName: 'DaVinci Resolve Studio 19',
    authorName: 'Sameer Sen',
    rating: 5,
    title: 'Legit Studio serial key!',
    comment: 'Activated directly inside DaVinci Resolve Studio on macOS. Neural engine tools and voice isolation work flawlessly. Incredible price.',
    date: '2026-11-05',
    isVerifiedPurchase: true,
    isApproved: true
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Tech Store work?',
    answer: 'Tech Store is an authenticated digital marketplace for genuine software, AI subscriptions, and developer assets. Once you select your product and complete secure checkout, our automated license engine generates your official product key, credential, or download access link directly in your customer dashboard and sends an encrypted copy to your email.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'How will I receive my digital product?',
    answer: 'Delivery is 100% digital. For automated keys (such as Windows 11 Pro, Office 2021, and IDM), your license key and direct download links appear immediately on the order confirmation screen upon payment completion. For account-based delivery (such as Adobe Creative Cloud or ChatGPT Plus), access is provisioned within 15 to 60 minutes.',
    category: 'delivery'
  },
  {
    id: 'faq-3',
    question: 'How long does delivery take?',
    answer: 'Instant automated products are delivered in under 10 seconds. Account-based invitations or custom domain provisions are fulfilled within 15 to 120 minutes during working hours, with 24/7 automated emergency dispatch.',
    category: 'delivery'
  },
  {
    id: 'faq-4',
    question: 'Are the products compatible with Windows and Mac?',
    answer: 'Every product card and details page explicitly states operating system compatibility. Windows keys are engineered for Windows PC/laptops, while tools like Cursor, JetBrains, Adobe CC, and DaVinci Resolve work natively on both Windows and macOS.',
    category: 'licensing'
  },
  {
    id: 'faq-5',
    question: 'How can I contact customer support?',
    answer: 'You can reach our dedicated technical support team through our 24/7 WhatsApp concierge (+91 98765 43210 placeholder), through our interactive ticketing portal in your Customer Dashboard, or by emailing support@techstore.io.',
    category: 'support'
  },
  {
    id: 'faq-6',
    question: 'What is the refund policy?',
    answer: 'We provide a 100% money-back guarantee if a license key or digital credential fails to activate and our technical team cannot resolve it within 24 hours. Because products are digital, refunds are processed once key non-activation is verified server-side.',
    category: 'support'
  },
  {
    id: 'faq-7',
    question: 'How can I track my order?',
    answer: 'You can track orders directly through the "Order Tracking" link in the navbar or footer by entering your Order ID and email address, or by logging into your Customer Dashboard where all active and past orders are archived.',
    category: 'delivery'
  },
  {
    id: 'faq-8',
    question: 'Can I get an invoice for business GST or tax deduction?',
    answer: 'Yes! Official tax invoices with itemized breakdowns and downloadable PDF receipts are automatically generated for every order. You can download your invoice directly from the Order Success screen or Customer Dashboard.',
    category: 'payments'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'TS-98241',
    customerName: 'Aarav Patel',
    email: 'aarav.patel@example.com',
    phone: '+91 98200 12345',
    items: [
      {
        productId: 'prod-win-1',
        productName: 'Windows 11 Pro Genuine Retail Key',
        quantity: 1,
        price: 699,
        licenseDuration: 'Permanent / 1 PC',
        deliveryType: 'instant_automated',
        licenseKey: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
        downloadLink: 'https://www.microsoft.com/software-download/windows11'
      }
    ],
    subtotal: 699,
    discount: 0,
    tax: 0,
    total: 699,
    currency: 'INR',
    paymentMethod: 'razorpay',
    paymentStatus: 'completed',
    fulfillmentStatus: 'fulfilled',
    razorpayOrderId: 'order_O4kLmQpZ7829',
    razorpayPaymentId: 'pay_O4kMnpQr9102',
    createdAt: '2026-11-08T14:22:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'TS-98242',
    customerName: 'Priya Sundaram',
    email: 'priya.sundaram@example.com',
    phone: '+91 97110 54321',
    items: [
      {
        productId: 'prod-ai-3',
        productName: 'Cursor AI Pro (Developer IDE)',
        quantity: 1,
        price: 1899,
        licenseDuration: '1 Year License',
        deliveryType: 'instant_automated',
        licenseKey: 'CUR-PRO-9810-AF72-45DC-2026',
        downloadLink: 'https://cursor.com/download'
      },
      {
        productId: 'prod-dig-1',
        productName: 'Cyberpunk & Futuristic UI Kit',
        quantity: 1,
        price: 1499,
        licenseDuration: 'Commercial Developer License',
        deliveryType: 'instant_automated',
        downloadLink: 'https://github.com/techstore-digital/cyberpunk-ui-kit'
      }
    ],
    subtotal: 3398,
    discount: 339.8,
    couponCode: 'WELCOME10',
    tax: 0,
    total: 3058.2,
    currency: 'INR',
    paymentMethod: 'razorpay',
    paymentStatus: 'completed',
    fulfillmentStatus: 'fulfilled',
    razorpayOrderId: 'order_P91kJvMn8734',
    razorpayPaymentId: 'pay_P91lWzKl6541',
    createdAt: '2026-11-09T09:15:00Z'
  }
];
