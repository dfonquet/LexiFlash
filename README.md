# LexiFlash

LexiFlash is a browser extension that explains technology terms while you browse.

It is focused on engineering, networking, and web infrastructure terminology. Select a term such as `BGP`, `MPLS`, `SRv6`, `DNS`, `HTTP`, `TLS`, `TCP`, `ports`, `CORS`, or `JWT`, and LexiFlash shows what it is, why it matters, and links to official references such as RFCs, IANA, MDN, WHATWG, W3C, TC39, IEEE, NIST, ISO, or vendor docs.

## Overview

LexiFlash is not a general translator. It is a lightweight technical glossary that helps readers understand protocols, APIs, languages, formats, and web platform concepts without leaving the current page.

## Current features

- Select a technology term or short phrase on any webpage.
- Show a small floating action near the selection.
- Display a concise explanation in an in-page popup.
- Show the concept type, definition, and why it matters.
- Include official or high-quality source links such as RFCs and MDN.
- Save recent lookups in a popup history view.
- Let users disable history from the settings page.
- Store preferences locally with `chrome.storage`.
- Use a modern Manifest V3 extension architecture.

## Covered examples

- Routing: BGP, MP-BGP, BGP-LU, OSPF, IS-IS, EIGRP, RIP
- MPLS and Segment Routing: MPLS, SR, SR-MPLS, SRv6
- Layer 2 and overlays: VLAN, STP, LACP, VXLAN
- Transport and internet layer: IP, TCP, UDP, ICMP, IGMP, QUIC
- Security and access: TLS, IPsec, VPN, ACL, firewall, SSH
- Addressing and services: DNS, DHCP, NAT, VRF, MTU, ports
- Application protocols: HTTP, HTTPS, HTTP/2, HTTP/3, SMTP, IMAP, POP3, FTP, LDAP, SIP, RTP, SNMP, NTP
- Web/dev basics: API, REST, JSON, HTML, CSS, JavaScript, SQL, JWT, OAuth 2.0

## Tech stack

- HTML
- CSS
- JavaScript
- Chrome Extensions API
- Manifest V3
- `chrome.storage` for local persistence
- Local technical glossary with official source links

## Project structure

```text
lexiflash/
|-- manifest.json
|-- service-worker.js
|-- content.js
|-- popup.html
|-- popup.js
|-- options.html
|-- options.js
|-- styles/
|   |-- content.css
|   |-- popup.css
|   `-- options.css
|-- icons/
`-- README.md
```

## Development setup

1. Open Chrome and go to:

```text
chrome://extensions/
```

2. Enable **Developer mode**.

3. Click **Load unpacked** and select the project folder.

```text
E:\Git-Path\LexiFlash
```

4. After code changes, click **Reload** on the extension and refresh the page you are testing.

## Expected user flow

1. Open any technical article or documentation page.
2. Select a term like `CORS`, `JWT`, `DNS`, or `REST API`.
3. Click the LexiFlash floating action.
4. Read the definition and source links in the current page.
5. Review previous searches from the extension popup.

## Current status

This project has a working local MVP for technology explanations.

## Roadmap

- [x] Create the base project structure.
- [x] Define the Manifest V3 configuration.
- [x] Implement selection handling.
- [x] Build the popup with recent history.
- [x] Build the options page.
- [x] Add a technology-focused local glossary.
- [x] Add official source links for supported terms.
- [x] Expand the glossary with core networking and infrastructure terms.
- [ ] Add more cloud, security, backend, and frontend terms.
- [ ] Add fuzzy matching for related terms.
- [ ] Add a backend or AI mode for unknown concepts.
- [ ] Publish the first functional version.

## License

MIT.
