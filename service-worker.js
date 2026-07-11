const DICTIONARY_API_BASE = "https://api.dictionaryapi.dev/api/v2/entries/";
const WIKTIONARY_API_BASES = {
  es: "https://es.wiktionary.org/w/api.php",
  en: "https://en.wiktionary.org/w/api.php"
};

const TECH_TERMS = {
  api: {
    title: "API",
    kind: "Software interface",
    definition: "An API is a contract that lets one piece of software request capabilities or data from another piece of software.",
    whyItMatters: "APIs are how apps, services, browsers, databases, and integrations talk to each other without sharing internal implementation details.",
    sources: [
      { label: "MDN: Web APIs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction" }
    ],
    aliases: ["application programming interface"]
  },
  cors: {
    title: "CORS",
    kind: "Browser security mechanism",
    definition: "CORS is a browser-controlled mechanism that lets a server decide which other origins are allowed to read its responses.",
    whyItMatters: "It protects users by preventing a random website from freely reading sensitive responses from another site.",
    sources: [
      { label: "Fetch Standard: CORS protocol", url: "https://fetch.spec.whatwg.org/#http-cors-protocol" },
      { label: "MDN: CORS", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS" }
    ],
    aliases: ["cross origin resource sharing", "cross-origin resource sharing"]
  },
  dns: {
    title: "DNS",
    kind: "Internet naming system",
    definition: "DNS maps human-readable domain names, such as example.com, to records like IP addresses that computers use to route traffic.",
    whyItMatters: "Without DNS, users would need to remember network addresses instead of names.",
    sources: [
      { label: "RFC 1034: Domain Names - Concepts", url: "https://www.rfc-editor.org/rfc/rfc1034" },
      { label: "RFC 1035: Domain Names - Implementation", url: "https://www.rfc-editor.org/rfc/rfc1035" }
    ],
    aliases: ["domain name system"]
  },
  html: {
    title: "HTML",
    kind: "Markup language",
    definition: "HTML is the markup language used to structure web documents with elements such as headings, links, forms, images, and sections.",
    whyItMatters: "It gives browsers the semantic structure they need to render and interpret web pages.",
    sources: [
      { label: "WHATWG: HTML Standard", url: "https://html.spec.whatwg.org/" },
      { label: "MDN: HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
    ],
    aliases: ["hypertext markup language"]
  },
  http: {
    title: "HTTP",
    kind: "Application protocol",
    definition: "HTTP is the request-response protocol used by clients and servers to transfer web resources.",
    whyItMatters: "It is the foundation of web browsing, APIs, caching, status codes, methods, and headers.",
    sources: [
      { label: "RFC 9110: HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
      { label: "MDN: HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }
    ],
    aliases: ["hypertext transfer protocol"]
  },
  https: {
    title: "HTTPS",
    kind: "Secure web transport",
    definition: "HTTPS is HTTP carried over TLS so that web traffic is encrypted, authenticated, and protected from tampering.",
    whyItMatters: "It protects logins, cookies, API traffic, and user data from interception on the network.",
    sources: [
      { label: "RFC 9110: HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
      { label: "RFC 8446: TLS 1.3", url: "https://www.rfc-editor.org/rfc/rfc8446" }
    ],
    aliases: ["http secure", "hypertext transfer protocol secure"]
  },
  ip: {
    title: "IP",
    kind: "Internet layer protocol",
    definition: "IP is the network protocol that addresses and routes packets between devices across interconnected networks.",
    whyItMatters: "It is the addressing layer that lets traffic move across the internet.",
    sources: [
      { label: "RFC 791: Internet Protocol", url: "https://www.rfc-editor.org/rfc/rfc791" },
      { label: "RFC 8200: IPv6 Specification", url: "https://www.rfc-editor.org/rfc/rfc8200" }
    ],
    aliases: ["internet protocol", "ipv4", "ipv6"]
  },
  javascript: {
    title: "JavaScript",
    kind: "Programming language",
    definition: "JavaScript is the programming language used by browsers and many runtimes to add behavior, interactivity, and application logic.",
    whyItMatters: "It powers most client-side web applications and is also widely used on servers through runtimes such as Node.js.",
    sources: [
      { label: "ECMA-262: ECMAScript", url: "https://tc39.es/ecma262/" },
      { label: "MDN: JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
    ],
    aliases: ["js", "ecmascript"]
  },
  json: {
    title: "JSON",
    kind: "Data format",
    definition: "JSON is a lightweight text format for representing structured data with objects, arrays, strings, numbers, booleans, and null.",
    whyItMatters: "It is one of the most common formats for web APIs and configuration files.",
    sources: [
      { label: "RFC 8259: JSON", url: "https://www.rfc-editor.org/rfc/rfc8259" },
      { label: "ECMA-404: JSON", url: "https://www.ecma-international.org/publications-and-standards/standards/ecma-404/" }
    ],
    aliases: ["javascript object notation"]
  },
  jwt: {
    title: "JWT",
    kind: "Token format",
    definition: "A JWT is a compact token format for representing claims as a signed JSON object.",
    whyItMatters: "It is commonly used for identity, authorization, and session-like flows, but it must be validated carefully.",
    sources: [
      { label: "RFC 7519: JSON Web Token", url: "https://www.rfc-editor.org/rfc/rfc7519" }
    ],
    aliases: ["json web token"]
  },
  oauth: {
    title: "OAuth 2.0",
    kind: "Authorization framework",
    definition: "OAuth 2.0 is a framework that lets an application get limited access to protected resources without directly handling a user's password.",
    whyItMatters: "It is the basis for many sign-in and delegated-access systems used by modern apps.",
    sources: [
      { label: "RFC 6749: OAuth 2.0", url: "https://www.rfc-editor.org/rfc/rfc6749" },
      { label: "RFC 6750: Bearer Token Usage", url: "https://www.rfc-editor.org/rfc/rfc6750" }
    ],
    aliases: ["oauth2", "oauth 2", "oauth 2.0"]
  },
  rest: {
    title: "REST",
    kind: "Architectural style",
    definition: "REST is an architectural style for networked systems built around resources, representations, stateless requests, and standard interface constraints.",
    whyItMatters: "Many web APIs call themselves REST APIs because they expose resources through HTTP methods and URLs.",
    sources: [
      { label: "Roy Fielding dissertation: REST", url: "https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm" },
      { label: "MDN: HTTP request methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods" }
    ],
    aliases: ["representational state transfer", "rest api"]
  },
  sql: {
    title: "SQL",
    kind: "Database query language",
    definition: "SQL is a language for defining, querying, and manipulating data in relational database systems.",
    whyItMatters: "It is the standard language behind many transactional and analytical databases.",
    sources: [
      { label: "ISO: SQL standard overview", url: "https://www.iso.org/standard/76583.html" },
      { label: "PostgreSQL: SQL language", url: "https://www.postgresql.org/docs/current/sql.html" }
    ],
    aliases: ["structured query language"]
  },
  tcp: {
    title: "TCP",
    kind: "Transport protocol",
    definition: "TCP is a reliable, ordered, connection-oriented transport protocol used to deliver byte streams between applications.",
    whyItMatters: "It powers many protocols, including HTTP/1.1, HTTP/2, SSH, SMTP, and database connections.",
    sources: [
      { label: "RFC 9293: Transmission Control Protocol", url: "https://www.rfc-editor.org/rfc/rfc9293" }
    ],
    aliases: ["transmission control protocol"]
  },
  tls: {
    title: "TLS",
    kind: "Security protocol",
    definition: "TLS is a cryptographic protocol that provides encryption, authentication, and integrity for network communications.",
    whyItMatters: "It is the security layer behind HTTPS and many other secure protocols.",
    sources: [
      { label: "RFC 8446: TLS 1.3", url: "https://www.rfc-editor.org/rfc/rfc8446" }
    ],
    aliases: ["transport layer security", "ssl"]
  },
  udp: {
    title: "UDP",
    kind: "Transport protocol",
    definition: "UDP is a connectionless transport protocol that sends datagrams without guaranteeing delivery, ordering, or retransmission.",
    whyItMatters: "It is useful when low latency matters more than built-in reliability, such as DNS, streaming, games, and QUIC.",
    sources: [
      { label: "RFC 768: User Datagram Protocol", url: "https://www.rfc-editor.org/rfc/rfc768" },
      { label: "RFC 9000: QUIC", url: "https://www.rfc-editor.org/rfc/rfc9000" }
    ],
    aliases: ["user datagram protocol"]
  },
  acl: {
    title: "ACL",
    kind: "Network/security policy",
    definition: "An ACL is a rule list used to permit or deny traffic based on fields such as source, destination, protocol, or port.",
    whyItMatters: "ACLs are a basic control point for segmentation, router filtering, firewall policy, and access restriction.",
    sources: [
      { label: "Cisco: IP access lists", url: "https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html" }
    ],
    aliases: ["access control list", "access-list", "access list"]
  },
  arp: {
    title: "ARP",
    kind: "Address resolution protocol",
    definition: "ARP maps an IPv4 address to a link-layer address, such as an Ethernet MAC address, on a local network.",
    whyItMatters: "Hosts need ARP before they can send IPv4 packets to local neighbors or default gateways over Ethernet.",
    sources: [
      { label: "RFC 826: Address Resolution Protocol", url: "https://www.rfc-editor.org/rfc/rfc826" }
    ],
    aliases: ["address resolution protocol"]
  },
  bfd: {
    title: "BFD",
    kind: "Fast failure detection protocol",
    definition: "BFD is a lightweight protocol used to detect path failures quickly between forwarding engines.",
    whyItMatters: "Routing protocols can use BFD to converge faster when a link, neighbor, or forwarding path fails.",
    sources: [
      { label: "RFC 5880: Bidirectional Forwarding Detection", url: "https://www.rfc-editor.org/rfc/rfc5880" }
    ],
    aliases: ["bidirectional forwarding detection"]
  },
  bgp: {
    title: "BGP",
    kind: "Inter-domain routing protocol",
    definition: "BGP is the path-vector routing protocol used to exchange reachability information between autonomous systems.",
    whyItMatters: "BGP is the control plane that makes internet routing and many large private networks work.",
    sources: [
      { label: "RFC 4271: Border Gateway Protocol 4", url: "https://www.rfc-editor.org/rfc/rfc4271" },
      { label: "RFC 4760: Multiprotocol Extensions for BGP-4", url: "https://www.rfc-editor.org/rfc/rfc4760" }
    ],
    aliases: ["border gateway protocol", "bgp4", "mp-bgp", "mpbgp"]
  },
  bgp_lu: {
    title: "BGP-LU",
    kind: "Labeled BGP routing",
    definition: "BGP-LU uses BGP to advertise routes together with MPLS labels.",
    whyItMatters: "Service provider networks use it to build inter-AS MPLS reachability and labeled transport.",
    sources: [
      { label: "RFC 8277: BGP Prefix-SID and labeled routes", url: "https://www.rfc-editor.org/rfc/rfc8277" },
      { label: "RFC 3107: Carrying Label Information in BGP-4", url: "https://www.rfc-editor.org/rfc/rfc3107" }
    ],
    aliases: ["bgp lu", "bgp-lu", "labeled unicast", "bgp labeled unicast"]
  },
  cdn: {
    title: "CDN",
    kind: "Content delivery architecture",
    definition: "A CDN is a distributed network of edge servers that caches and serves content closer to users.",
    whyItMatters: "CDNs reduce latency, absorb traffic spikes, and improve availability for web content and APIs.",
    sources: [
      { label: "Cloudflare: What is a CDN?", url: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/" },
      { label: "MDN: Caching", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching" }
    ],
    aliases: ["content delivery network"]
  },
  dhcp: {
    title: "DHCP",
    kind: "Host configuration protocol",
    definition: "DHCP automatically assigns IP configuration such as address, gateway, DNS servers, and lease time to hosts.",
    whyItMatters: "It removes the need to manually configure IP settings on every endpoint.",
    sources: [
      { label: "RFC 2131: Dynamic Host Configuration Protocol", url: "https://www.rfc-editor.org/rfc/rfc2131" },
      { label: "RFC 8415: DHCP for IPv6", url: "https://www.rfc-editor.org/rfc/rfc8415" }
    ],
    aliases: ["dynamic host configuration protocol", "dhcpv4", "dhcpv6"]
  },
  dscp: {
    title: "DSCP",
    kind: "QoS packet marking",
    definition: "DSCP is a field in the IP header used to mark packets for differentiated forwarding behavior.",
    whyItMatters: "Networks use DSCP markings to prioritize latency-sensitive or important traffic.",
    sources: [
      { label: "RFC 2474: Differentiated Services Field", url: "https://www.rfc-editor.org/rfc/rfc2474" },
      { label: "RFC 4594: Diffserv Service Classes", url: "https://www.rfc-editor.org/rfc/rfc4594" }
    ],
    aliases: ["differentiated services code point", "diffserv", "qos"]
  },
  eigrp: {
    title: "EIGRP",
    kind: "Interior gateway routing protocol",
    definition: "EIGRP is a distance-vector based interior routing protocol originally developed by Cisco.",
    whyItMatters: "It is still found in enterprise networks and supports fast convergence with loop-free path computation.",
    sources: [
      { label: "RFC 7868: Cisco EIGRP", url: "https://www.rfc-editor.org/rfc/rfc7868" }
    ],
    aliases: ["enhanced interior gateway routing protocol"]
  },
  firewall: {
    title: "Firewall",
    kind: "Network security control",
    definition: "A firewall enforces traffic policy between networks, hosts, applications, or security zones.",
    whyItMatters: "It is a primary boundary for blocking unwanted traffic, reducing exposure, and segmenting systems.",
    sources: [
      { label: "NIST SP 800-41: Guidelines on Firewalls", url: "https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final" }
    ],
    aliases: ["network firewall", "stateful firewall"]
  },
  ftp: {
    title: "FTP",
    kind: "File transfer protocol",
    definition: "FTP is an older application protocol for transferring files between a client and server.",
    whyItMatters: "It is historically important, but modern deployments often prefer encrypted alternatives such as SFTP or HTTPS.",
    sources: [
      { label: "RFC 959: File Transfer Protocol", url: "https://www.rfc-editor.org/rfc/rfc959" }
    ],
    aliases: ["file transfer protocol"]
  },
  gre: {
    title: "GRE",
    kind: "Tunneling protocol",
    definition: "GRE encapsulates packets inside another IP packet to carry traffic across an intermediate network.",
    whyItMatters: "It is commonly used to build simple tunnels, overlay paths, or transport non-native protocols.",
    sources: [
      { label: "RFC 2784: Generic Routing Encapsulation", url: "https://www.rfc-editor.org/rfc/rfc2784" }
    ],
    aliases: ["generic routing encapsulation"]
  },
  http2: {
    title: "HTTP/2",
    kind: "HTTP version",
    definition: "HTTP/2 is a binary framing version of HTTP with multiplexing, header compression, and stream prioritization.",
    whyItMatters: "It improves web performance by allowing multiple streams over one connection.",
    sources: [
      { label: "RFC 9113: HTTP/2", url: "https://www.rfc-editor.org/rfc/rfc9113" },
      { label: "MDN: HTTP/2", url: "https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2" }
    ],
    aliases: ["http/2", "h2"]
  },
  http3: {
    title: "HTTP/3",
    kind: "HTTP version over QUIC",
    definition: "HTTP/3 maps HTTP semantics onto QUIC instead of TCP.",
    whyItMatters: "It can reduce connection setup latency and avoid some head-of-line blocking issues from TCP.",
    sources: [
      { label: "RFC 9114: HTTP/3", url: "https://www.rfc-editor.org/rfc/rfc9114" },
      { label: "RFC 9000: QUIC", url: "https://www.rfc-editor.org/rfc/rfc9000" }
    ],
    aliases: ["http/3", "h3"]
  },
  icmp: {
    title: "ICMP",
    kind: "Internet control protocol",
    definition: "ICMP carries control, error, and diagnostic messages for IP networks.",
    whyItMatters: "Tools like ping and traceroute rely on ICMP behavior, and networks use it for path feedback.",
    sources: [
      { label: "RFC 792: ICMP for IPv4", url: "https://www.rfc-editor.org/rfc/rfc792" },
      { label: "RFC 4443: ICMPv6", url: "https://www.rfc-editor.org/rfc/rfc4443" }
    ],
    aliases: ["internet control message protocol", "icmpv4", "icmpv6"]
  },
  igmp: {
    title: "IGMP",
    kind: "IPv4 multicast membership protocol",
    definition: "IGMP lets IPv4 hosts tell local routers which multicast groups they want to receive.",
    whyItMatters: "It is part of multicast delivery for streaming, IPTV, and other one-to-many traffic.",
    sources: [
      { label: "RFC 3376: IGMPv3", url: "https://www.rfc-editor.org/rfc/rfc3376" }
    ],
    aliases: ["internet group management protocol"]
  },
  imap: {
    title: "IMAP",
    kind: "Email retrieval protocol",
    definition: "IMAP lets mail clients access and manage email stored on a mail server.",
    whyItMatters: "It keeps mail synchronized across multiple devices and clients.",
    sources: [
      { label: "RFC 9051: Internet Message Access Protocol", url: "https://www.rfc-editor.org/rfc/rfc9051" }
    ],
    aliases: ["internet message access protocol"]
  },
  ipsec: {
    title: "IPsec",
    kind: "IP-layer security suite",
    definition: "IPsec is a suite of protocols for authenticating and encrypting IP packets.",
    whyItMatters: "It is widely used for site-to-site VPNs, remote access VPNs, and secure network overlays.",
    sources: [
      { label: "RFC 4301: Security Architecture for IP", url: "https://www.rfc-editor.org/rfc/rfc4301" },
      { label: "RFC 7296: IKEv2", url: "https://www.rfc-editor.org/rfc/rfc7296" }
    ],
    aliases: ["ip security", "ikev2", "vpn ipsec"]
  },
  isis: {
    title: "IS-IS",
    kind: "Interior gateway routing protocol",
    definition: "IS-IS is a link-state routing protocol used inside autonomous systems.",
    whyItMatters: "It is common in service provider and large-scale networks because it scales well and supports extensions like Segment Routing.",
    sources: [
      { label: "RFC 1195: Use of OSI IS-IS for IP", url: "https://www.rfc-editor.org/rfc/rfc1195" },
      { label: "RFC 5308: Routing IPv6 with IS-IS", url: "https://www.rfc-editor.org/rfc/rfc5308" }
    ],
    aliases: ["is-is", "intermediate system to intermediate system"]
  },
  lacp: {
    title: "LACP",
    kind: "Link aggregation protocol",
    definition: "LACP dynamically bundles multiple physical Ethernet links into one logical link.",
    whyItMatters: "It increases bandwidth and resiliency between switches, servers, firewalls, and routers.",
    sources: [
      { label: "IEEE 802.1AX: Link Aggregation", url: "https://1.ieee802.org/tsn/802-1ax-rev/" }
    ],
    aliases: ["link aggregation control protocol", "port channel", "etherchannel", "lag"]
  },
  ldap: {
    title: "LDAP",
    kind: "Directory access protocol",
    definition: "LDAP is a protocol for accessing and managing directory information such as users, groups, and devices.",
    whyItMatters: "It is often used for enterprise identity, authentication, and directory lookups.",
    sources: [
      { label: "RFC 4511: LDAPv3", url: "https://www.rfc-editor.org/rfc/rfc4511" }
    ],
    aliases: ["lightweight directory access protocol"]
  },
  load_balancer: {
    title: "Load Balancer",
    kind: "Traffic distribution component",
    definition: "A load balancer distributes traffic across multiple backend servers or services.",
    whyItMatters: "It improves availability, scalability, and maintenance flexibility for applications.",
    sources: [
      { label: "NGINX: Load balancing overview", url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/" },
      { label: "HAProxy: Introduction", url: "https://www.haproxy.org/" }
    ],
    aliases: ["load balancer", "load balancing", "lb"]
  },
  mpls: {
    title: "MPLS",
    kind: "Label switching technology",
    definition: "MPLS forwards packets using short labels instead of only performing IP longest-prefix matching at every hop.",
    whyItMatters: "It enables traffic engineering, VPN services, fast reroute, and scalable service provider transport.",
    sources: [
      { label: "RFC 3031: MPLS Architecture", url: "https://www.rfc-editor.org/rfc/rfc3031" },
      { label: "RFC 3032: MPLS Label Stack Encoding", url: "https://www.rfc-editor.org/rfc/rfc3032" }
    ],
    aliases: ["multiprotocol label switching", "label switching"]
  },
  mtu: {
    title: "MTU",
    kind: "Packet size limit",
    definition: "MTU is the maximum packet size that can be sent over a link without fragmentation at that layer.",
    whyItMatters: "MTU mismatches can break tunnels, VPNs, PMTUD, and large packet flows in subtle ways.",
    sources: [
      { label: "RFC 8201: Path MTU Discovery for IPv6", url: "https://www.rfc-editor.org/rfc/rfc8201" },
      { label: "RFC 1191: Path MTU Discovery for IPv4", url: "https://www.rfc-editor.org/rfc/rfc1191" }
    ],
    aliases: ["maximum transmission unit", "path mtu", "pmtu", "pmtud"]
  },
  nat: {
    title: "NAT",
    kind: "Address translation",
    definition: "NAT translates IP addresses, and sometimes ports, as traffic crosses between networks.",
    whyItMatters: "It is widely used for IPv4 address conservation, internet edge connectivity, and private addressing.",
    sources: [
      { label: "RFC 3022: Traditional NAT", url: "https://www.rfc-editor.org/rfc/rfc3022" },
      { label: "RFC 4787: NAT UDP Requirements", url: "https://www.rfc-editor.org/rfc/rfc4787" }
    ],
    aliases: ["network address translation", "pat", "port address translation", "napt"]
  },
  ntp: {
    title: "NTP",
    kind: "Time synchronization protocol",
    definition: "NTP synchronizes clocks across networked systems.",
    whyItMatters: "Accurate time is critical for logs, certificates, authentication, distributed systems, and incident response.",
    sources: [
      { label: "RFC 5905: Network Time Protocol Version 4", url: "https://www.rfc-editor.org/rfc/rfc5905" }
    ],
    aliases: ["network time protocol"]
  },
  ospf: {
    title: "OSPF",
    kind: "Interior gateway routing protocol",
    definition: "OSPF is a link-state routing protocol used to exchange routes inside an autonomous system.",
    whyItMatters: "It is a common enterprise and service provider IGP with areas, cost-based paths, and fast convergence.",
    sources: [
      { label: "RFC 2328: OSPF Version 2", url: "https://www.rfc-editor.org/rfc/rfc2328" },
      { label: "RFC 5340: OSPF for IPv6", url: "https://www.rfc-editor.org/rfc/rfc5340" }
    ],
    aliases: ["open shortest path first", "ospfv2", "ospfv3"]
  },
  pim: {
    title: "PIM",
    kind: "Multicast routing protocol",
    definition: "PIM builds multicast distribution trees between routers independently of the unicast routing protocol.",
    whyItMatters: "It is used for routing multicast traffic across routed networks.",
    sources: [
      { label: "RFC 7761: PIM Sparse Mode", url: "https://www.rfc-editor.org/rfc/rfc7761" }
    ],
    aliases: ["protocol independent multicast", "pim-sm", "pim sparse mode"]
  },
  pop3: {
    title: "POP3",
    kind: "Email retrieval protocol",
    definition: "POP3 lets a mail client download messages from a server.",
    whyItMatters: "It is a simple legacy mail retrieval protocol, often contrasted with IMAP.",
    sources: [
      { label: "RFC 1939: Post Office Protocol Version 3", url: "https://www.rfc-editor.org/rfc/rfc1939" }
    ],
    aliases: ["post office protocol", "post office protocol 3"]
  },
  ports: {
    title: "Ports",
    kind: "Transport-layer service identifiers",
    definition: "Ports identify application endpoints on a host for transport protocols such as TCP and UDP.",
    whyItMatters: "Ports let one IP address host many services, such as TCP 443 for HTTPS or UDP/TCP 53 for DNS.",
    sources: [
      { label: "IANA: Service Name and Port Number Registry", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml" },
      { label: "RFC 6335: Port Number Procedures", url: "https://www.rfc-editor.org/rfc/rfc6335" }
    ],
    aliases: ["port", "puerto", "puertos", "tcp port", "udp port", "well-known ports", "ephemeral ports"]
  },
  ppp: {
    title: "PPP",
    kind: "Point-to-point link protocol",
    definition: "PPP encapsulates network-layer packets over point-to-point links.",
    whyItMatters: "It is the basis for technologies like PPPoE and many legacy WAN access designs.",
    sources: [
      { label: "RFC 1661: Point-to-Point Protocol", url: "https://www.rfc-editor.org/rfc/rfc1661" }
    ],
    aliases: ["point-to-point protocol", "point to point protocol"]
  },
  pppoe: {
    title: "PPPoE",
    kind: "Access encapsulation protocol",
    definition: "PPPoE carries PPP sessions over Ethernet.",
    whyItMatters: "It is commonly used by broadband access providers for subscriber sessions and authentication.",
    sources: [
      { label: "RFC 2516: PPP over Ethernet", url: "https://www.rfc-editor.org/rfc/rfc2516" }
    ],
    aliases: ["ppp over ethernet", "point-to-point protocol over ethernet"]
  },
  quic: {
    title: "QUIC",
    kind: "Transport protocol",
    definition: "QUIC is a UDP-based, encrypted transport protocol with streams, connection migration, and built-in TLS 1.3 security.",
    whyItMatters: "It is the transport layer used by HTTP/3 and can improve latency and resilience for modern web traffic.",
    sources: [
      { label: "RFC 9000: QUIC", url: "https://www.rfc-editor.org/rfc/rfc9000" },
      { label: "RFC 9001: Using TLS to Secure QUIC", url: "https://www.rfc-editor.org/rfc/rfc9001" }
    ],
    aliases: ["quick udp internet connections"]
  },
  rip: {
    title: "RIP",
    kind: "Distance-vector routing protocol",
    definition: "RIP is a simple distance-vector routing protocol that uses hop count as its metric.",
    whyItMatters: "It is mostly legacy today, but it is important for understanding routing protocol fundamentals.",
    sources: [
      { label: "RFC 2453: RIP Version 2", url: "https://www.rfc-editor.org/rfc/rfc2453" }
    ],
    aliases: ["routing information protocol", "ripv2"]
  },
  rtp: {
    title: "RTP",
    kind: "Real-time media transport protocol",
    definition: "RTP carries real-time audio, video, and similar media over IP networks.",
    whyItMatters: "It is central to VoIP, conferencing, streaming, and real-time communications.",
    sources: [
      { label: "RFC 3550: RTP", url: "https://www.rfc-editor.org/rfc/rfc3550" }
    ],
    aliases: ["real-time transport protocol", "real time transport protocol"]
  },
  sip: {
    title: "SIP",
    kind: "Session signaling protocol",
    definition: "SIP is used to establish, modify, and terminate multimedia sessions such as voice and video calls.",
    whyItMatters: "It is one of the core signaling protocols behind VoIP and unified communications.",
    sources: [
      { label: "RFC 3261: Session Initiation Protocol", url: "https://www.rfc-editor.org/rfc/rfc3261" }
    ],
    aliases: ["session initiation protocol"]
  },
  smtp: {
    title: "SMTP",
    kind: "Email transfer protocol",
    definition: "SMTP transfers email between mail clients, submission agents, and mail servers.",
    whyItMatters: "It is the core protocol for sending email across the internet.",
    sources: [
      { label: "RFC 5321: Simple Mail Transfer Protocol", url: "https://www.rfc-editor.org/rfc/rfc5321" }
    ],
    aliases: ["simple mail transfer protocol"]
  },
  snmp: {
    title: "SNMP",
    kind: "Network management protocol",
    definition: "SNMP is used to monitor and manage network devices through structured management information.",
    whyItMatters: "It enables metrics, device status, alerts, and operational visibility across network infrastructure.",
    sources: [
      { label: "RFC 3411: SNMP Architecture", url: "https://www.rfc-editor.org/rfc/rfc3411" }
    ],
    aliases: ["simple network management protocol"]
  },
  sr: {
    title: "Segment Routing",
    kind: "Source-routing architecture",
    definition: "Segment Routing lets a node steer packets through a network by encoding an ordered list of instructions called segments.",
    whyItMatters: "It simplifies traffic engineering and service provider transport by reducing per-flow state in the core.",
    sources: [
      { label: "RFC 8402: Segment Routing Architecture", url: "https://www.rfc-editor.org/rfc/rfc8402" }
    ],
    aliases: ["segment routing", "sr-mpls", "sr mpls"]
  },
  srv6: {
    title: "SRv6",
    kind: "Segment Routing over IPv6",
    definition: "SRv6 uses IPv6 Segment Routing Headers to encode network instructions directly in IPv6 packets.",
    whyItMatters: "It brings traffic engineering and service chaining into IPv6-native networks without MPLS labels.",
    sources: [
      { label: "RFC 8986: Segment Routing over IPv6 Network Programming", url: "https://www.rfc-editor.org/rfc/rfc8986" },
      { label: "RFC 8754: IPv6 Segment Routing Header", url: "https://www.rfc-editor.org/rfc/rfc8754" }
    ],
    aliases: ["sr v6", "segment routing ipv6", "segment routing over ipv6"]
  },
  ssh: {
    title: "SSH",
    kind: "Secure remote access protocol",
    definition: "SSH is a protocol for secure remote login, command execution, tunneling, and file transfer.",
    whyItMatters: "It is the standard secure management protocol for servers, routers, switches, and developer workflows.",
    sources: [
      { label: "RFC 4251: SSH Protocol Architecture", url: "https://www.rfc-editor.org/rfc/rfc4251" }
    ],
    aliases: ["secure shell"]
  },
  stp: {
    title: "STP",
    kind: "Layer 2 loop prevention protocol",
    definition: "STP prevents Ethernet switching loops by building a loop-free logical topology.",
    whyItMatters: "Layer 2 loops can melt a network with broadcast storms, so STP protects switched networks.",
    sources: [
      { label: "IEEE 802.1D: MAC Bridges", url: "https://1.ieee802.org/maintenance/802-1d/" },
      { label: "IEEE 802.1Q: Bridges and VLANs", url: "https://1.ieee802.org/maintenance/802-1q/" }
    ],
    aliases: ["spanning tree protocol", "rstp", "rapid spanning tree"]
  },
  vlan: {
    title: "VLAN",
    kind: "Layer 2 network segmentation",
    definition: "A VLAN is a logical Layer 2 segment that separates broadcast domains over shared switching infrastructure.",
    whyItMatters: "VLANs are fundamental for network segmentation, security zones, and multi-tenant switching.",
    sources: [
      { label: "IEEE 802.1Q: Bridges and VLANs", url: "https://1.ieee802.org/maintenance/802-1q/" }
    ],
    aliases: ["virtual lan", "virtual local area network", "802.1q", "dot1q"]
  },
  vpn: {
    title: "VPN",
    kind: "Private network overlay",
    definition: "A VPN creates a protected logical network path across another network.",
    whyItMatters: "VPNs are used for remote access, site-to-site connectivity, private overlays, and traffic protection.",
    sources: [
      { label: "RFC 4301: IPsec Architecture", url: "https://www.rfc-editor.org/rfc/rfc4301" },
      { label: "RFC 4364: BGP/MPLS IP VPNs", url: "https://www.rfc-editor.org/rfc/rfc4364" }
    ],
    aliases: ["virtual private network"]
  },
  vrf: {
    title: "VRF",
    kind: "Routing table virtualization",
    definition: "A VRF separates routing tables on the same network device.",
    whyItMatters: "It allows overlapping IP spaces, tenant separation, and VPN-style segmentation on shared infrastructure.",
    sources: [
      { label: "RFC 4364: BGP/MPLS IP VPNs", url: "https://www.rfc-editor.org/rfc/rfc4364" }
    ],
    aliases: ["virtual routing and forwarding", "vrf-lite", "vrf lite"]
  },
  vxlan: {
    title: "VXLAN",
    kind: "Layer 2 overlay technology",
    definition: "VXLAN encapsulates Layer 2 Ethernet frames over Layer 3 networks using UDP.",
    whyItMatters: "It enables scalable data center overlays and network virtualization beyond traditional VLAN limits.",
    sources: [
      { label: "RFC 7348: Virtual eXtensible LAN", url: "https://www.rfc-editor.org/rfc/rfc7348" }
    ],
    aliases: ["virtual extensible lan", "vni", "vxlan vni"]
  }
};

const TECH_ALIAS_INDEX = buildTechAliasIndex(TECH_TERMS);

const LOCAL_DEFINITIONS = {};

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["history", "settings"]);

  if (!data.history) {
    await chrome.storage.local.set({ history: [] });
  }

  if (!data.settings) {
    await chrome.storage.local.set({
      settings: {
        detailLevel: "short",
        saveHistory: true
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_MEANING") {
    handleGetMeaning(message.payload)
      .then(sendResponse)
      .catch((error) => {
        console.error("GET_MEANING error:", error);
        sendResponse({
          ok: false,
          summary: "Unable to retrieve the meaning right now."
        });
      });

    return true;
  }

  if (message?.type === "GET_HISTORY") {
    chrome.storage.local.get(["history"]).then((data) => {
      sendResponse({
        ok: true,
        history: data.history || []
      });
    });

    return true;
  }
});

async function handleGetMeaning(payload) {
  const term = normalizeQuery(payload?.text || payload?.word);
  const context = normalizeContext(payload?.context || term);

  if (!term) {
    return {
      ok: false,
      summary: "No word or phrase was provided."
    };
  }

  const { history = [], settings = {} } = await chrome.storage.local.get([
    "history",
    "settings"
  ]);

  const detailLevel = settings.detailLevel || "short";
  const saveHistory = settings.saveHistory !== false;

  const result = await getDefinition(term, context, detailLevel);

  if (saveHistory && result.ok) {
    const newEntry = {
      word: term,
      summary: result.summary,
      source: result.source,
      createdAt: new Date().toISOString()
    };

    const updatedHistory = [
      newEntry,
      ...history.filter(
        (entry) => normalizeQuery(entry.word) !== term
      )
    ].slice(0, 20);

    await chrome.storage.local.set({
      history: updatedHistory
    });
  }

  return {
    ok: result.ok,
    word: term,
    title: result.title || term,
    kind: result.kind || "",
    definition: result.definition || result.summary,
    whyItMatters: result.whyItMatters || "",
    sources: result.sources || [],
    summary: result.summary,
    source: result.source
  };
}

async function getDefinition(word, context, detailLevel) {
  const techEntry = findTechEntry(word, context);

  if (techEntry) {
    return {
      ok: true,
      title: techEntry.title,
      kind: techEntry.kind,
      definition: techEntry.definition,
      whyItMatters: techEntry.whyItMatters,
      sources: techEntry.sources,
      summary: formatTechSummary(techEntry),
      source: techEntry.sources.map((item) => item.label).join(", ")
    };
  }

  return {
    ok: false,
    title: word,
    kind: "Not in technology glossary",
    definition: `I could not match "${word}" to a technology term yet.`,
    whyItMatters: "Try selecting a technical acronym, protocol, language, API name, or engineering concept.",
    sources: [],
    summary: `No tech definition found for "${word}". Try terms like BGP, MPLS, SR, SRv6, DNS, HTTP, HTTPS, ports, TCP, UDP, TLS, VLAN, VXLAN, OSPF, IS-IS, NAT, DHCP, or IPsec.`,
    source: "none"
  };

  const definitions = [];

  if (isSingleTerm(word)) {
    definitions.push(
      ...(await safeLookup(() => fetchDictionaryApiDefinitions(word, "es"))),
      ...(await safeLookup(() => fetchDictionaryApiDefinitions(word, "en")))
    );
  }

  definitions.push(
    ...(await safeLookup(() => fetchWiktionaryDefinitions(word, "es"))),
    ...(await safeLookup(() => fetchWiktionaryDefinitions(word, "en")))
  );

  if (definitions.length) {
    const rankedDefinitions = rankDefinitions(definitions, context);
    const best = rankedDefinitions[0];
    const references = buildReferences(rankedDefinitions, best);

    return {
      ok: true,
      summary: formatMeaningSummary(word, best, references, detailLevel),
      source: references.map((item) => item.source).join(", ")
    };
  }

  const fallback = LOCAL_DEFINITIONS[word];

  if (fallback) {
    return {
      ok: true,
      summary: formatMeaningSummary(
        word,
        { definition: fallback, language: "es", source: "local" },
        [],
        detailLevel
      ),
      source: "local"
    };
  }

  return {
    ok: false,
    summary: `No encontre una definicion para "${word}". Try another form or a shorter phrase.`,
    source: "none"
  };
}

async function fetchDictionaryApiDefinitions(word, language) {
  const response = await fetch(
    `${DICTIONARY_API_BASE}${language}/${encodeURIComponent(word)}`
  );

  if (!response.ok) {
    return [];
  }

  const entries = await response.json();
  return collectDictionaryApiDefinitions(entries, language);
}

function collectDictionaryApiDefinitions(entries, language) {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.flatMap((entry) => {
    return (entry.meanings || []).flatMap((meaning) => {
      return (meaning.definitions || [])
        .filter((definition) => definition.definition)
        .map((definition) => ({
          language,
          source: `dictionaryapi.dev/${language}`,
          partOfSpeech: meaning.partOfSpeech,
          definition: definition.definition,
          example: definition.example
        }));
    });
  });
}

async function fetchWiktionaryDefinitions(word, language) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    prop: "extracts",
    redirects: "1",
    explaintext: "1",
    titles: word
  });

  const response = await fetch(
    `${WIKTIONARY_API_BASES[language]}?${params.toString()}`
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const pages = Object.values(data?.query?.pages || {});
  const page = pages.find((item) => item && item.pageid && item.extract);

  if (!page) {
    return [];
  }

  return parseWiktionaryExtract(page.extract, language);
}

function parseWiktionaryExtract(extract, language) {
  const blockedHeadings = new Set([
    "espanol",
    "etimologia",
    "pronunciacion",
    "vease tambien",
    "referencias",
    "traducciones",
    "locuciones",
    "conjugacion",
    "forma verbal",
    "forma adjetiva",
    "forma sustantiva",
    "english",
    "spanish",
    "etymology",
    "pronunciation",
    "noun",
    "verb",
    "adjective",
    "adverb",
    "references",
    "translations",
    "see also"
  ]);

  const candidates = extract
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !blockedHeadings.has(removeAccents(line.toLowerCase())))
    .filter((line) => !/^[-=]+$/.test(line))
    .filter((line) => !/^(del|de la|de el|de un|de una)\b/i.test(line))
    .map((line) => line.replace(/^\d+\s*/, ""))
    .filter((line) => line.length > 18);

  return candidates.slice(0, 8).map((definition) => ({
    language,
    source: language === "es" ? "Wikcionario" : "Wiktionary",
    definition
  }));
}

async function safeLookup(lookup) {
  try {
    return await lookup();
  } catch (error) {
    console.warn("Lookup failed:", error);
    return [];
  }
}

function buildTechAliasIndex(terms) {
  return Object.entries(terms).reduce((index, [key, entry]) => {
    index.set(normalizeTechKey(key), key);
    index.set(normalizeTechKey(entry.title), key);

    for (const alias of entry.aliases || []) {
      index.set(normalizeTechKey(alias), key);
    }

    return index;
  }, new Map());
}

function findTechEntry(term, context) {
  const normalizedTerm = normalizeTechKey(term);
  const directKey = TECH_ALIAS_INDEX.get(normalizedTerm);

  if (directKey) {
    return TECH_TERMS[directKey];
  }

  const contextKey = findTechKeyInText(context);

  if (contextKey && normalizedTerm.length <= 3) {
    return TECH_TERMS[contextKey];
  }

  return null;
}

function findTechKeyInText(text) {
  const normalizedText = ` ${normalizeTechKey(text)} `;

  for (const [alias, key] of TECH_ALIAS_INDEX.entries()) {
    if (alias.length > 2 && normalizedText.includes(` ${alias} `)) {
      return key;
    }
  }

  return "";
}

function normalizeTechKey(value) {
  return removeAccents(String(value || "").toLowerCase())
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatTechSummary(entry) {
  return [
    `${entry.title} - ${entry.kind}`,
    `Definition: ${entry.definition}`,
    `Why it matters: ${entry.whyItMatters}`,
    "Sources:",
    ...entry.sources.map((source) => `- ${source.label}`)
  ].join("\n");
}

function rankDefinitions(definitions, context) {
  const contextTokens = new Set(tokenize(context));

  return definitions
    .map((item, index) => {
      const definitionTokens = tokenize(`${item.definition} ${item.example || ""}`);
      const overlap = definitionTokens.filter((token) => contextTokens.has(token)).length;
      const languageBoost = item.language === "es" || item.language === "en" ? 1 : 0;

      return {
        ...item,
        score: overlap + languageBoost - index * 0.01
      };
    })
    .sort((a, b) => b.score - a.score);
}

function buildReferences(definitions, best) {
  const references = [best];

  for (const language of ["es", "en"]) {
    const match = definitions.find((item) => item.language === language);

    if (match && !references.includes(match)) {
      references.push(match);
    }
  }

  return references.slice(0, 3);
}

function formatMeaningSummary(word, best, references, detailLevel) {
  const lines = [`Best match for "${word}": ${best.definition}`];

  if (best.example && detailLevel === "medium") {
    lines.push(`Example: ${best.example}`);
  }

  if (references.length) {
    lines.push(
      ...references.map((item) => {
        const label = item.language === "es" ? "ES reference" : "EN reference";
        return `${label} (${item.source}): ${item.definition}`;
      })
    );
  }

  return lines.join("\n");
}

function isSingleTerm(value) {
  return !String(value || "").trim().includes(" ");
}

function normalizeQuery(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("es")
    .replace(/[^\p{L}\p{N}\-\s']/gu, "")
    .replace(/\s+/g, " ")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
}

function normalizeContext(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 700);
}

function tokenize(value) {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "para",
    "por",
    "con",
    "que",
    "una",
    "uno",
    "los",
    "las",
    "del",
    "este",
    "esta",
    "esto"
  ]);

  return removeAccents(String(value || "").toLowerCase())
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function removeAccents(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
