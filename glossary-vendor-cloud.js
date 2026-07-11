self.VENDOR_CLOUD_TERMS = {
  cisco_ios: {
    title: "Cisco IOS",
    kind: "Cisco network operating system",
    definition: "Cisco IOS is the classic Cisco network operating system used on many routers and switches.",
    whyItMatters: "It is foundational for Cisco CLI workflows, routing, switching, security features, and enterprise network operations.",
    sources: [
      { label: "Cisco IOS Software", url: "https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-software-releases-listing.html" }
    ],
    aliases: ["ios", "cisco ios"]
  },
  cisco_ios_xe: {
    title: "Cisco IOS XE",
    kind: "Cisco network operating system",
    definition: "Cisco IOS XE is Cisco's modern IOS-based operating system built on a Linux-based architecture.",
    whyItMatters: "It powers many Catalyst, ASR, ISR, and enterprise platforms and supports programmability, model-driven telemetry, and modern automation.",
    sources: [
      { label: "Cisco IOS XE", url: "https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-xe/index.html" }
    ],
    aliases: ["ios xe", "ios-xe", "cisco ios xe"]
  },
  cisco_ios_xr: {
    title: "Cisco IOS XR",
    kind: "Cisco service provider OS",
    definition: "Cisco IOS XR is Cisco's modular network operating system for carrier-grade routers.",
    whyItMatters: "It is common in service provider cores, edge routers, and large-scale routing environments.",
    sources: [
      { label: "Cisco IOS XR", url: "https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-xr-software/index.html" }
    ],
    aliases: ["ios xr", "ios-xr", "cisco ios xr"]
  },
  cisco_nx_os: {
    title: "Cisco NX-OS",
    kind: "Cisco data center OS",
    definition: "Cisco NX-OS is Cisco's network operating system for Nexus data center switches.",
    whyItMatters: "It is used for data center fabrics, vPC, VXLAN EVPN, high-density switching, and automation.",
    sources: [
      { label: "Cisco NX-OS", url: "https://www.cisco.com/c/en/us/products/ios-nx-os-software/nx-os-software/index.html" }
    ],
    aliases: ["nx-os", "nx os", "cisco nx-os", "nexus os"]
  },
  cisco_aci: {
    title: "Cisco ACI",
    kind: "Cisco data center SDN fabric",
    definition: "Cisco ACI is a policy-based SDN architecture for data center networking using APIC controllers and Nexus switches.",
    whyItMatters: "It abstracts network intent into tenants, VRFs, bridge domains, EPGs, contracts, and fabric policies.",
    sources: [
      { label: "Cisco ACI", url: "https://www.cisco.com/c/en/us/solutions/data-center-virtualization/application-centric-infrastructure/index.html" }
    ],
    aliases: ["aci", "application centric infrastructure", "apic", "cisco apic"]
  },
  cisco_sdwan: {
    title: "Cisco SD-WAN",
    kind: "Cisco WAN overlay platform",
    definition: "Cisco SD-WAN is a software-defined WAN solution for building encrypted application-aware overlays across WAN transports.",
    whyItMatters: "It centralizes WAN policy, segmentation, routing, security, and transport selection across branches and clouds.",
    sources: [
      { label: "Cisco SD-WAN", url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/sd-wan/index.html" }
    ],
    aliases: ["viptela", "cisco viptela", "sd-wan", "sdwan", "vedge", "cedge", "vmanage", "vsmart", "vbond"]
  },
  cisco_meraki: {
    title: "Cisco Meraki",
    kind: "Cloud-managed networking platform",
    definition: "Cisco Meraki is a cloud-managed platform for switches, wireless, security appliances, cameras, and sensors.",
    whyItMatters: "It simplifies operations through centralized cloud management and dashboard-driven configuration.",
    sources: [
      { label: "Cisco Meraki Documentation", url: "https://documentation.meraki.com/" }
    ],
    aliases: ["meraki", "meraki dashboard", "mx", "ms switch", "mr wireless"]
  },
  cisco_umbrella: {
    title: "Cisco Umbrella",
    kind: "Cloud security service",
    definition: "Cisco Umbrella is a cloud-delivered security platform focused on DNS-layer security, secure web gateway, firewall, and CASB capabilities.",
    whyItMatters: "It helps block malicious destinations and enforce security policy before or during network connections.",
    sources: [
      { label: "Cisco Umbrella", url: "https://umbrella.cisco.com/" }
    ],
    aliases: ["umbrella", "opendns", "dns security"]
  },
  cisco_ise: {
    title: "Cisco ISE",
    kind: "Identity and network access control platform",
    definition: "Cisco ISE provides identity-based access control, posture, profiling, guest access, and policy enforcement.",
    whyItMatters: "It is commonly used with 802.1X, TrustSec, NAC, RADIUS, and enterprise segmentation.",
    sources: [
      { label: "Cisco Identity Services Engine", url: "https://www.cisco.com/c/en/us/products/security/identity-services-engine/index.html" }
    ],
    aliases: ["ise", "cisco identity services engine", "nac", "trustsec", "sgt", "security group tag"]
  },
  hsrp: {
    title: "HSRP",
    kind: "Cisco first-hop redundancy protocol",
    definition: "HSRP lets multiple routers provide a virtual default gateway for hosts.",
    whyItMatters: "It provides gateway redundancy so hosts can keep using the same default gateway address if one router fails.",
    sources: [
      { label: "RFC 2281: Cisco HSRP", url: "https://www.rfc-editor.org/rfc/rfc2281" }
    ],
    aliases: ["hot standby router protocol"]
  },
  vpc_cisco: {
    title: "Cisco vPC",
    kind: "Cisco Nexus multichassis link aggregation",
    definition: "Cisco vPC lets links connected to two Nexus switches appear as one logical port channel to downstream devices.",
    whyItMatters: "It improves Layer 2 resiliency and bandwidth without relying on blocking Spanning Tree paths.",
    sources: [
      { label: "Cisco: Virtual Port Channel", url: "https://www.cisco.com/c/en/us/support/docs/switches/nexus-7000-series-switches/118978-config-vpc-00.html" }
    ],
    aliases: ["vpc", "virtual port channel", "cisco vpc", "peer-link", "vpc peer link"]
  },
  cisco_portfast: {
    title: "PortFast",
    kind: "Cisco STP edge-port feature",
    definition: "PortFast lets an access port transition quickly to forwarding because it is expected to connect to an endpoint, not another switch.",
    whyItMatters: "It speeds endpoint connectivity while features like BPDU Guard protect against accidental loops.",
    sources: [
      { label: "Cisco: Spanning Tree PortFast", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/10556-16.html" }
    ],
    aliases: ["portfast", "bpdu guard", "bpduguard", "root guard", "loop guard"]
  },
  cef: {
    title: "CEF",
    kind: "Cisco packet forwarding architecture",
    definition: "Cisco Express Forwarding is a Cisco switching architecture that uses a FIB and adjacency table for efficient packet forwarding.",
    whyItMatters: "CEF is core to high-performance forwarding on many Cisco platforms.",
    sources: [
      { label: "Cisco: Cisco Express Forwarding", url: "https://www.cisco.com/c/en/us/support/docs/ip/express-forwarding-cef/47321-cef-whichpath.html" }
    ],
    aliases: ["cisco express forwarding", "cef switching"]
  },
  netflow: {
    title: "NetFlow",
    kind: "Network flow telemetry",
    definition: "NetFlow records metadata about network flows such as source, destination, ports, protocol, and byte counts.",
    whyItMatters: "It helps with traffic visibility, capacity planning, security investigations, and application analysis.",
    sources: [
      { label: "RFC 3954: Cisco NetFlow Services Export V9", url: "https://www.rfc-editor.org/rfc/rfc3954" },
      { label: "RFC 7011: IPFIX Protocol", url: "https://www.rfc-editor.org/rfc/rfc7011" }
    ],
    aliases: ["netflow", "ipfix", "flexible netflow", "flow telemetry"]
  },
  junos: {
    title: "Junos OS",
    kind: "Juniper network operating system",
    definition: "Junos OS is Juniper's network operating system used across routers, switches, and security platforms.",
    whyItMatters: "It provides a consistent CLI, candidate configuration model, commit workflow, and automation interfaces.",
    sources: [
      { label: "Juniper Junos OS Documentation", url: "https://www.juniper.net/documentation/us/en/software/junos/" }
    ],
    aliases: ["junos", "juniper junos", "junos os"]
  },
  junos_commit: {
    title: "Junos Commit",
    kind: "Juniper configuration workflow",
    definition: "Junos uses a candidate configuration that must be committed before it becomes active.",
    whyItMatters: "Commit, commit confirmed, rollback, and compare workflows reduce operational risk during network changes.",
    sources: [
      { label: "Juniper: Commit a Configuration", url: "https://www.juniper.net/documentation/us/en/software/junos/cli/topics/topic-map/junos-configuration-commit.html" }
    ],
    aliases: ["commit", "commit confirmed", "rollback", "candidate configuration", "junos rollback", "show | compare"]
  },
  juniper_routing_instance: {
    title: "Juniper Routing Instance",
    kind: "Juniper routing virtualization object",
    definition: "A routing instance in Junos creates a separate routing context such as a VRF, virtual router, or forwarding instance.",
    whyItMatters: "It is fundamental for segmentation, L3VPNs, virtual routers, and multi-tenant network designs on Juniper.",
    sources: [
      { label: "Juniper: Routing Instances", url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-l3/topics/topic-map/l3-vpns-routing-instances.html" }
    ],
    aliases: ["routing-instance", "routing instance", "instance-type vrf", "virtual-router", "vrf juniper"]
  },
  juniper_mx: {
    title: "Juniper MX",
    kind: "Juniper routing platform",
    definition: "Juniper MX is a family of routers used for service provider edge, peering, broadband, and enterprise WAN roles.",
    whyItMatters: "MX platforms are common for BGP, MPLS, EVPN, L3VPN, subscriber services, and high-scale routing.",
    sources: [
      { label: "Juniper MX Series", url: "https://www.juniper.net/us/en/products/routers/mx-series.html" }
    ],
    aliases: ["mx", "mx series", "juniper mx"]
  },
  juniper_qfx: {
    title: "Juniper QFX",
    kind: "Juniper data center switch platform",
    definition: "Juniper QFX is a family of switches for data center, leaf-spine, EVPN-VXLAN, and high-performance switching designs.",
    whyItMatters: "QFX platforms are common in modern data center fabrics.",
    sources: [
      { label: "Juniper QFX Series", url: "https://www.juniper.net/us/en/products/switches/qfx-series.html" }
    ],
    aliases: ["qfx", "qfx series", "juniper qfx"]
  },
  juniper_srx: {
    title: "Juniper SRX",
    kind: "Juniper security gateway platform",
    definition: "Juniper SRX is a family of firewalls and security gateways that provide routing, VPN, NAT, and threat protection.",
    whyItMatters: "SRX devices are used at branches, data centers, and service provider edges for secure connectivity.",
    sources: [
      { label: "Juniper SRX Series", url: "https://www.juniper.net/us/en/products/security/srx-series.html" }
    ],
    aliases: ["srx", "srx series", "juniper srx", "screenos"]
  },
  juniper_mist: {
    title: "Juniper Mist",
    kind: "Cloud-managed AI networking platform",
    definition: "Juniper Mist is a cloud-managed networking platform for wireless, wired, WAN assurance, and AI-driven operations.",
    whyItMatters: "It provides telemetry-driven operations, user experience visibility, and automation for enterprise networks.",
    sources: [
      { label: "Juniper Mist", url: "https://www.juniper.net/us/en/products/mist-ai.html" }
    ],
    aliases: ["mist", "mist ai", "marvis"]
  },
  juniper_apstra: {
    title: "Juniper Apstra",
    kind: "Intent-based data center automation",
    definition: "Juniper Apstra automates data center fabric design, deployment, validation, and assurance.",
    whyItMatters: "It helps operate multivendor leaf-spine fabrics with intent, telemetry, and drift detection.",
    sources: [
      { label: "Juniper Apstra", url: "https://www.juniper.net/us/en/products/network-automation/apstra.html" }
    ],
    aliases: ["apstra", "intent based networking", "intent-based networking"]
  },
  huawei_vrp: {
    title: "Huawei VRP",
    kind: "Huawei network operating system",
    definition: "Huawei VRP is Huawei's network operating system used across routers, switches, and network devices.",
    whyItMatters: "It provides the CLI, routing, switching, MPLS, VPN, and management features for Huawei network platforms.",
    sources: [
      { label: "Huawei: VRP Documentation", url: "https://support.huawei.com/enterprise/en/doc/index.html" }
    ],
    aliases: ["vrp", "huawei vrp", "versatile routing platform"]
  },
  huawei_cloudengine: {
    title: "Huawei CloudEngine",
    kind: "Huawei data center switch platform",
    definition: "Huawei CloudEngine is a data center switch family for high-density Ethernet, cloud networks, and fabric designs.",
    whyItMatters: "It is Huawei's main data center switching line for leaf-spine and cloud networking.",
    sources: [
      { label: "Huawei CloudEngine Switches", url: "https://e.huawei.com/en/products/switches/data-center-switches" }
    ],
    aliases: ["cloudengine", "ce switch", "huawei ce", "huawei cloudengine"]
  },
  huawei_netengine: {
    title: "Huawei NetEngine",
    kind: "Huawei router platform",
    definition: "Huawei NetEngine is a router family used for carrier, metro, WAN, and edge networking.",
    whyItMatters: "It appears in service provider and large enterprise designs involving BGP, MPLS, SR, and VPN services.",
    sources: [
      { label: "Huawei NetEngine Routers", url: "https://e.huawei.com/en/products/routers" }
    ],
    aliases: ["netengine", "huawei netengine", "ne router", "netengine router"]
  },
  huawei_imaster_nce: {
    title: "Huawei iMaster NCE",
    kind: "Huawei network controller and management platform",
    definition: "Huawei iMaster NCE is a network automation, management, and control platform for campus, WAN, data center, and transport networks.",
    whyItMatters: "It centralizes intent, automation, assurance, and lifecycle operations for Huawei network environments.",
    sources: [
      { label: "Huawei iMaster NCE", url: "https://e.huawei.com/en/products/network-management-control-analysis/imaster-nce" }
    ],
    aliases: ["imaster nce", "nce", "huawei nce", "huawei imaster"]
  },
  huawei_eth_trunk: {
    title: "Eth-Trunk",
    kind: "Huawei link aggregation",
    definition: "Eth-Trunk is Huawei's logical interface for bundling multiple Ethernet links into one aggregated link.",
    whyItMatters: "It provides bandwidth aggregation and link redundancy, similar to LAG or port-channel concepts.",
    sources: [
      { label: "Huawei: Eth-Trunk Configuration", url: "https://support.huawei.com/enterprise/en/doc/index.html" }
    ],
    aliases: ["eth-trunk", "eth trunk", "huawei eth-trunk", "link aggregation huawei"]
  },
  huawei_qinq: {
    title: "QinQ",
    kind: "VLAN stacking",
    definition: "QinQ stacks VLAN tags so a provider can carry customer VLANs across a shared Layer 2 network.",
    whyItMatters: "It is used in carrier Ethernet and metro Ethernet designs for customer traffic separation.",
    sources: [
      { label: "IEEE 802.1Q", url: "https://1.ieee802.org/maintenance/802-1q/" }
    ],
    aliases: ["qinq", "802.1ad", "vlan stacking", "dot1q tunnel"]
  },
  aws_vpc: {
    title: "AWS VPC",
    kind: "AWS virtual network",
    definition: "Amazon VPC is a logically isolated virtual network in AWS where you launch and connect cloud resources.",
    whyItMatters: "VPCs define cloud IP ranges, subnets, route tables, gateways, endpoints, security groups, and connectivity patterns.",
    sources: [
      { label: "AWS VPC Documentation", url: "https://docs.aws.amazon.com/vpc/" }
    ],
    aliases: ["vpc", "amazon vpc", "aws virtual private cloud", "virtual private cloud"]
  },
  aws_subnet: {
    title: "AWS Subnet",
    kind: "AWS VPC network segment",
    definition: "An AWS subnet is a range of IP addresses in a VPC tied to one Availability Zone.",
    whyItMatters: "Subnets separate public and private resources and control routing, placement, and availability boundaries.",
    sources: [
      { label: "AWS: VPC Subnets", url: "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html" }
    ],
    aliases: ["aws subnet", "public subnet", "private subnet"]
  },
  aws_route_table: {
    title: "AWS Route Table",
    kind: "AWS VPC routing object",
    definition: "An AWS route table contains rules that determine where subnet or gateway traffic is directed.",
    whyItMatters: "Route tables control paths to internet gateways, NAT gateways, transit gateways, peering, VPNs, and local routes.",
    sources: [
      { label: "AWS: Route Tables", url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html" }
    ],
    aliases: ["aws route table", "vpc route table", "route table aws"]
  },
  aws_igw: {
    title: "AWS Internet Gateway",
    kind: "AWS internet edge gateway",
    definition: "An Internet Gateway lets resources in a VPC communicate with the internet when routing and addressing allow it.",
    whyItMatters: "It is required for public IPv4/IPv6 internet connectivity from a VPC.",
    sources: [
      { label: "AWS: Internet Gateways", url: "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html" }
    ],
    aliases: ["internet gateway", "igw", "aws igw"]
  },
  aws_nat_gateway: {
    title: "AWS NAT Gateway",
    kind: "AWS managed NAT service",
    definition: "AWS NAT Gateway lets instances in private subnets initiate outbound connections while remaining unreachable from inbound internet traffic.",
    whyItMatters: "It is a standard pattern for private workloads needing software updates, APIs, or external access.",
    sources: [
      { label: "AWS: NAT Gateways", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" }
    ],
    aliases: ["nat gateway", "aws nat", "aws nat gateway"]
  },
  aws_tgw: {
    title: "AWS Transit Gateway",
    kind: "AWS cloud network hub",
    definition: "AWS Transit Gateway connects VPCs, VPNs, and Direct Connect attachments through a regional routing hub.",
    whyItMatters: "It simplifies large AWS network topologies by replacing many point-to-point connections with hub-and-spoke routing.",
    sources: [
      { label: "AWS Transit Gateway", url: "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html" }
    ],
    aliases: ["transit gateway", "tgw", "aws tgw"]
  },
  aws_direct_connect: {
    title: "AWS Direct Connect",
    kind: "AWS dedicated connectivity",
    definition: "AWS Direct Connect provides dedicated network connectivity between an external network and AWS.",
    whyItMatters: "It is used for predictable performance, private connectivity, hybrid cloud, and high-throughput workloads.",
    sources: [
      { label: "AWS Direct Connect", url: "https://docs.aws.amazon.com/directconnect/" }
    ],
    aliases: ["direct connect", "dx", "aws dx"]
  },
  aws_privatelink: {
    title: "AWS PrivateLink",
    kind: "Private service connectivity",
    definition: "AWS PrivateLink provides private connectivity to services using interface VPC endpoints without exposing traffic to the public internet.",
    whyItMatters: "It is used for private SaaS, shared services, and secure service access between VPCs or accounts.",
    sources: [
      { label: "AWS PrivateLink", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html" }
    ],
    aliases: ["privatelink", "private link", "interface endpoint", "vpc endpoint", "aws endpoint"]
  },
  aws_security_group: {
    title: "AWS Security Group",
    kind: "AWS stateful virtual firewall",
    definition: "A security group controls inbound and outbound traffic for AWS resources such as EC2 instances and ENIs.",
    whyItMatters: "It is one of the most important controls for cloud workload segmentation and exposure management.",
    sources: [
      { label: "AWS: Security Groups", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html" }
    ],
    aliases: ["security group", "sg", "aws sg"]
  },
  aws_nacl: {
    title: "AWS Network ACL",
    kind: "AWS stateless subnet firewall",
    definition: "A network ACL controls inbound and outbound traffic at the subnet boundary with stateless ordered rules.",
    whyItMatters: "NACLs provide subnet-level guardrails in addition to stateful security groups.",
    sources: [
      { label: "AWS: Network ACLs", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html" }
    ],
    aliases: ["nacl", "network acl", "aws nacl"]
  },
  aws_elb: {
    title: "AWS ELB",
    kind: "AWS load balancing service",
    definition: "Elastic Load Balancing distributes application or network traffic across multiple targets.",
    whyItMatters: "ALB, NLB, and Gateway Load Balancer are core AWS patterns for scale, availability, and service exposure.",
    sources: [
      { label: "AWS Elastic Load Balancing", url: "https://docs.aws.amazon.com/elasticloadbalancing/" }
    ],
    aliases: ["elb", "alb", "nlb", "gateway load balancer", "application load balancer", "network load balancer"]
  },
  aws_route53: {
    title: "Amazon Route 53",
    kind: "AWS DNS service",
    definition: "Amazon Route 53 is AWS's DNS, domain registration, and health-checking service.",
    whyItMatters: "It provides public and private DNS, routing policies, hosted zones, and name resolution for AWS architectures.",
    sources: [
      { label: "Amazon Route 53", url: "https://docs.aws.amazon.com/route53/" }
    ],
    aliases: ["route 53", "route53", "aws dns", "hosted zone", "private hosted zone"]
  },
  aws_cloudfront: {
    title: "Amazon CloudFront",
    kind: "AWS CDN",
    definition: "Amazon CloudFront is AWS's content delivery network for caching and delivering content from edge locations.",
    whyItMatters: "It improves latency, scale, and security for web apps, APIs, static assets, and media delivery.",
    sources: [
      { label: "Amazon CloudFront", url: "https://docs.aws.amazon.com/cloudfront/" }
    ],
    aliases: ["cloudfront", "aws cdn"]
  },
  aws_ec2: {
    title: "Amazon EC2",
    kind: "AWS virtual compute service",
    definition: "Amazon EC2 provides resizable virtual machines called instances in AWS.",
    whyItMatters: "It is a core building block for compute workloads, networking labs, appliances, and scalable applications.",
    sources: [
      { label: "Amazon EC2", url: "https://docs.aws.amazon.com/ec2/" }
    ],
    aliases: ["ec2", "ec2 instance", "aws instance"]
  },
  aws_s3: {
    title: "Amazon S3",
    kind: "AWS object storage service",
    definition: "Amazon S3 stores objects in buckets with high durability and scalable access patterns.",
    whyItMatters: "It is used for backups, static websites, data lakes, logs, artifacts, and application storage.",
    sources: [
      { label: "Amazon S3", url: "https://docs.aws.amazon.com/s3/" }
    ],
    aliases: ["s3", "s3 bucket", "object storage"]
  },
  aws_lambda: {
    title: "AWS Lambda",
    kind: "AWS serverless compute",
    definition: "AWS Lambda runs code in response to events without requiring users to manage servers.",
    whyItMatters: "It is a common serverless pattern for event-driven automation, APIs, data processing, and integrations.",
    sources: [
      { label: "AWS Lambda", url: "https://docs.aws.amazon.com/lambda/" }
    ],
    aliases: ["lambda", "serverless"]
  },
  aws_eks: {
    title: "Amazon EKS",
    kind: "AWS managed Kubernetes",
    definition: "Amazon EKS is AWS's managed Kubernetes service.",
    whyItMatters: "It lets teams run Kubernetes clusters on AWS while AWS manages parts of the control plane.",
    sources: [
      { label: "Amazon EKS", url: "https://docs.aws.amazon.com/eks/" }
    ],
    aliases: ["eks", "aws kubernetes"]
  },
  aws_cloudwatch: {
    title: "Amazon CloudWatch",
    kind: "AWS monitoring and observability service",
    definition: "CloudWatch collects metrics, logs, alarms, and events from AWS resources and applications.",
    whyItMatters: "It is central for AWS operational visibility, alerting, dashboards, and troubleshooting.",
    sources: [
      { label: "Amazon CloudWatch", url: "https://docs.aws.amazon.com/cloudwatch/" }
    ],
    aliases: ["cloudwatch", "cw logs", "cloudwatch logs"]
  },
  aws_cloudtrail: {
    title: "AWS CloudTrail",
    kind: "AWS API audit logging service",
    definition: "CloudTrail records AWS account activity and API calls.",
    whyItMatters: "It is essential for security auditing, incident response, compliance, and change tracking.",
    sources: [
      { label: "AWS CloudTrail", url: "https://docs.aws.amazon.com/cloudtrail/" }
    ],
    aliases: ["cloudtrail", "aws audit logs"]
  },
  gcp_vpc: {
    title: "Google Cloud VPC",
    kind: "GCP virtual network",
    definition: "Google Cloud VPC is a global virtual network that provides connectivity for Google Cloud resources.",
    whyItMatters: "It defines subnets, routes, firewall policy, private connectivity, and hybrid cloud network foundations.",
    sources: [
      { label: "Google Cloud VPC", url: "https://cloud.google.com/vpc/docs" }
    ],
    aliases: ["gcp vpc", "google cloud vpc", "vpc network"]
  },
  gcp_subnet: {
    title: "Google Cloud Subnet",
    kind: "GCP VPC subnet",
    definition: "A Google Cloud subnet is a regional IP range inside a VPC network.",
    whyItMatters: "Unlike AWS, GCP VPCs are global and subnets are regional, which changes network design patterns.",
    sources: [
      { label: "Google Cloud: Subnets", url: "https://cloud.google.com/vpc/docs/subnets" }
    ],
    aliases: ["gcp subnet", "google cloud subnet", "regional subnet"]
  },
  gcp_firewall: {
    title: "Google Cloud Firewall",
    kind: "GCP network security policy",
    definition: "Google Cloud firewall rules control traffic to and from resources in a VPC network.",
    whyItMatters: "They are a primary enforcement point for workload exposure, segmentation, and access control in GCP.",
    sources: [
      { label: "Google Cloud Firewall", url: "https://cloud.google.com/firewall/docs" }
    ],
    aliases: ["gcp firewall", "google cloud firewall", "vpc firewall rules", "hierarchical firewall policy"]
  },
  gcp_cloud_router: {
    title: "Cloud Router",
    kind: "GCP dynamic routing service",
    definition: "Cloud Router exchanges routes dynamically using BGP between Google Cloud and external networks or services.",
    whyItMatters: "It is required for dynamic routing with Cloud VPN, Cloud Interconnect, and some hybrid connectivity designs.",
    sources: [
      { label: "Google Cloud Router", url: "https://cloud.google.com/network-connectivity/docs/router" }
    ],
    aliases: ["cloud router", "gcp cloud router", "google cloud router"]
  },
  gcp_cloud_nat: {
    title: "Cloud NAT",
    kind: "GCP managed NAT service",
    definition: "Cloud NAT lets private Google Cloud resources initiate outbound connections without assigning external IP addresses.",
    whyItMatters: "It is the standard GCP pattern for private workloads that need internet egress.",
    sources: [
      { label: "Google Cloud NAT", url: "https://cloud.google.com/nat/docs" }
    ],
    aliases: ["cloud nat", "gcp nat", "google cloud nat"]
  },
  gcp_cloud_vpn: {
    title: "Cloud VPN",
    kind: "GCP site-to-site VPN service",
    definition: "Cloud VPN connects Google Cloud VPC networks to external networks through IPsec VPN tunnels.",
    whyItMatters: "It is used for encrypted hybrid connectivity and backup paths to on-premises or other clouds.",
    sources: [
      { label: "Google Cloud VPN", url: "https://cloud.google.com/network-connectivity/docs/vpn" }
    ],
    aliases: ["cloud vpn", "gcp vpn", "ha vpn", "classic vpn"]
  },
  gcp_interconnect: {
    title: "Cloud Interconnect",
    kind: "GCP dedicated hybrid connectivity",
    definition: "Cloud Interconnect provides high-bandwidth private connectivity between external networks and Google Cloud.",
    whyItMatters: "It is used for predictable hybrid cloud performance, large data transfers, and private enterprise connectivity.",
    sources: [
      { label: "Google Cloud Interconnect", url: "https://cloud.google.com/network-connectivity/docs/interconnect" }
    ],
    aliases: ["cloud interconnect", "dedicated interconnect", "partner interconnect", "gcp interconnect"]
  },
  gcp_load_balancing: {
    title: "Google Cloud Load Balancing",
    kind: "GCP load balancing services",
    definition: "Google Cloud Load Balancing distributes traffic across backends using global or regional load balancing products.",
    whyItMatters: "It supports application delivery, high availability, scale, and global traffic management.",
    sources: [
      { label: "Google Cloud Load Balancing", url: "https://cloud.google.com/load-balancing/docs" }
    ],
    aliases: ["gcp load balancer", "google cloud load balancer", "cloud load balancing", "global load balancer"]
  },
  gcp_cloud_dns: {
    title: "Cloud DNS",
    kind: "GCP managed DNS service",
    definition: "Cloud DNS is Google Cloud's managed authoritative DNS service.",
    whyItMatters: "It manages public and private DNS zones for internet-facing and internal cloud name resolution.",
    sources: [
      { label: "Google Cloud DNS", url: "https://cloud.google.com/dns/docs" }
    ],
    aliases: ["cloud dns", "gcp dns", "google cloud dns", "managed zone"]
  },
  gcp_gce: {
    title: "Compute Engine",
    kind: "GCP virtual compute service",
    definition: "Compute Engine provides virtual machines and related compute infrastructure in Google Cloud.",
    whyItMatters: "It is a core GCP compute building block for servers, appliances, labs, and scalable workloads.",
    sources: [
      { label: "Google Compute Engine", url: "https://cloud.google.com/compute/docs" }
    ],
    aliases: ["compute engine", "gce", "google compute engine", "gcp vm"]
  },
  gcp_gke: {
    title: "Google Kubernetes Engine",
    kind: "GCP managed Kubernetes",
    definition: "Google Kubernetes Engine is Google Cloud's managed Kubernetes service.",
    whyItMatters: "It is one of the most widely used managed Kubernetes platforms and integrates with GCP networking, IAM, and observability.",
    sources: [
      { label: "Google Kubernetes Engine", url: "https://cloud.google.com/kubernetes-engine/docs" }
    ],
    aliases: ["gke", "google kubernetes engine", "gcp kubernetes"]
  },
  gcp_cloud_armor: {
    title: "Cloud Armor",
    kind: "GCP edge security service",
    definition: "Cloud Armor provides DDoS protection and web application firewall policy for Google Cloud applications.",
    whyItMatters: "It helps protect internet-facing workloads behind Google Cloud load balancers.",
    sources: [
      { label: "Google Cloud Armor", url: "https://cloud.google.com/armor/docs" }
    ],
    aliases: ["cloud armor", "gcp waf", "google cloud armor"]
  },
  gcp_cloud_logging: {
    title: "Cloud Logging",
    kind: "GCP logging service",
    definition: "Cloud Logging stores, searches, analyzes, and routes logs from Google Cloud and applications.",
    whyItMatters: "It is central for troubleshooting, audit workflows, observability, and security investigations in GCP.",
    sources: [
      { label: "Google Cloud Logging", url: "https://cloud.google.com/logging/docs" }
    ],
    aliases: ["cloud logging", "stackdriver logging", "gcp logs"]
  },
  gcp_cloud_monitoring: {
    title: "Cloud Monitoring",
    kind: "GCP monitoring service",
    definition: "Cloud Monitoring collects metrics, events, dashboards, alerts, and uptime checks for Google Cloud and applications.",
    whyItMatters: "It provides operational visibility and alerting for GCP environments.",
    sources: [
      { label: "Google Cloud Monitoring", url: "https://cloud.google.com/monitoring/docs" }
    ],
    aliases: ["cloud monitoring", "stackdriver monitoring", "gcp monitoring"]
  },
  cisco_asa: {
    title: "Cisco ASA",
    kind: "Cisco firewall platform",
    definition: "Cisco ASA is a firewall and VPN platform used for perimeter security, NAT, access policy, and remote access.",
    whyItMatters: "Many enterprise networks still operate ASA or migrated ASA concepts into newer Cisco security platforms.",
    sources: [
      { label: "Cisco ASA Documentation", url: "https://www.cisco.com/c/en/us/support/security/adaptive-security-appliance-asa-software/series.html" }
    ],
    aliases: ["asa", "adaptive security appliance", "cisco asa"]
  },
  cisco_firepower: {
    title: "Cisco Firepower",
    kind: "Cisco next-generation firewall platform",
    definition: "Cisco Firepower is a security platform for next-generation firewall, intrusion prevention, malware protection, and traffic inspection.",
    whyItMatters: "It is Cisco's modern firewall/security stack alongside Secure Firewall Management Center.",
    sources: [
      { label: "Cisco Secure Firewall", url: "https://www.cisco.com/c/en/us/products/security/firewalls/index.html" }
    ],
    aliases: ["firepower", "ftd", "fmc", "secure firewall", "firepower threat defense"]
  },
  cisco_catalyst: {
    title: "Cisco Catalyst",
    kind: "Cisco enterprise switching and wireless family",
    definition: "Cisco Catalyst is a family of enterprise switches and wireless products used for campus networking.",
    whyItMatters: "Catalyst platforms are common in access, distribution, core, SD-Access, and enterprise campus designs.",
    sources: [
      { label: "Cisco Catalyst Switches", url: "https://www.cisco.com/c/en/us/products/switches/campus-lan-access/index.html" }
    ],
    aliases: ["catalyst", "cat9k", "catalyst 9000", "cisco catalyst"]
  },
  cisco_nexus: {
    title: "Cisco Nexus",
    kind: "Cisco data center switching family",
    definition: "Cisco Nexus is a family of data center switches used for high-performance switching, VXLAN EVPN, vPC, and fabric designs.",
    whyItMatters: "Nexus is one of Cisco's main data center networking platforms.",
    sources: [
      { label: "Cisco Nexus Switches", url: "https://www.cisco.com/c/en/us/products/switches/data-center-switches/index.html" }
    ],
    aliases: ["nexus", "nexus 9k", "n9k", "cisco nexus"]
  },
  cisco_sd_access: {
    title: "Cisco SD-Access",
    kind: "Cisco campus fabric architecture",
    definition: "Cisco SD-Access is a campus networking architecture that uses policy, segmentation, automation, and fabric technologies.",
    whyItMatters: "It combines Cisco Catalyst Center, ISE, LISP, VXLAN, and TrustSec concepts for enterprise campus operations.",
    sources: [
      { label: "Cisco SD-Access", url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/software-defined-access/index.html" }
    ],
    aliases: ["sd-access", "sda", "sd access", "cisco catalyst center", "dna center", "dnac"]
  },
  cisco_ucs: {
    title: "Cisco UCS",
    kind: "Cisco server and compute platform",
    definition: "Cisco UCS is a server platform with unified management for compute, networking, and storage access.",
    whyItMatters: "It appears in data center infrastructure designs alongside Nexus, ACI, virtualization, and cloud platforms.",
    sources: [
      { label: "Cisco UCS", url: "https://www.cisco.com/c/en/us/products/servers-unified-computing/index.html" }
    ],
    aliases: ["ucs", "unified computing system", "fabric interconnect", "fi cisco"]
  },
  juniper_ex: {
    title: "Juniper EX",
    kind: "Juniper enterprise switch platform",
    definition: "Juniper EX is a family of Ethernet switches for enterprise campus and branch networks.",
    whyItMatters: "EX switches are common in access, aggregation, campus, and Mist-managed enterprise networks.",
    sources: [
      { label: "Juniper EX Series", url: "https://www.juniper.net/us/en/products/switches/ex-series.html" }
    ],
    aliases: ["ex", "ex series", "juniper ex"]
  },
  juniper_ptx: {
    title: "Juniper PTX",
    kind: "Juniper packet transport routing platform",
    definition: "Juniper PTX is a high-scale packet transport router family for service provider core and peering networks.",
    whyItMatters: "PTX platforms are used in high-capacity MPLS, IP, and service provider backbone designs.",
    sources: [
      { label: "Juniper PTX Series", url: "https://www.juniper.net/us/en/products/routers/ptx-series.html" }
    ],
    aliases: ["ptx", "ptx series", "juniper ptx"]
  },
  juniper_contrail: {
    title: "Juniper Contrail",
    kind: "Juniper SDN and cloud networking platform",
    definition: "Juniper Contrail is an SDN/cloud networking platform for virtual networking, overlays, and policy.",
    whyItMatters: "It is relevant in cloud, NFV, and service provider virtualized network environments.",
    sources: [
      { label: "Juniper Contrail Networking", url: "https://www.juniper.net/us/en/products/cloud-native-networking/contrail-networking.html" }
    ],
    aliases: ["contrail", "contrail networking", "tungsten fabric"]
  },
  huawei_usg: {
    title: "Huawei USG",
    kind: "Huawei firewall platform",
    definition: "Huawei USG is a family of security gateways and firewalls for enterprise and service provider networks.",
    whyItMatters: "USG devices provide firewalling, VPN, NAT, threat prevention, and perimeter security functions.",
    sources: [
      { label: "Huawei Firewalls", url: "https://e.huawei.com/en/products/security/firewall" }
    ],
    aliases: ["usg", "huawei usg", "huawei firewall"]
  },
  huawei_s_series: {
    title: "Huawei S Series",
    kind: "Huawei campus switch platform",
    definition: "Huawei S series switches are enterprise campus switches used for access, aggregation, and core layers.",
    whyItMatters: "They are common in Huawei campus LAN designs with VLAN, Eth-Trunk, QoS, and routing features.",
    sources: [
      { label: "Huawei Campus Switches", url: "https://e.huawei.com/en/products/switches/campus-switches" }
    ],
    aliases: ["s series", "huawei s series", "huawei campus switch"]
  },
  aws_iam: {
    title: "AWS IAM",
    kind: "AWS identity and access management service",
    definition: "AWS IAM manages identities, policies, roles, users, groups, and permissions for AWS resources.",
    whyItMatters: "IAM is the control plane for AWS access, least privilege, cross-account roles, and workload identity.",
    sources: [
      { label: "AWS IAM Documentation", url: "https://docs.aws.amazon.com/iam/" }
    ],
    aliases: ["aws iam", "iam policy", "iam role", "iam user", "sts", "assume role"]
  },
  aws_vpc_peering: {
    title: "AWS VPC Peering",
    kind: "AWS VPC-to-VPC connectivity",
    definition: "VPC peering privately connects two VPCs so resources can communicate using private IP addresses.",
    whyItMatters: "It is a simple connectivity pattern, but it is non-transitive and can become complex at scale.",
    sources: [
      { label: "AWS VPC Peering", url: "https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html" }
    ],
    aliases: ["vpc peering", "aws vpc peering", "peering connection"]
  },
  aws_ecs: {
    title: "Amazon ECS",
    kind: "AWS container orchestration service",
    definition: "Amazon ECS runs and manages containers on AWS using EC2 or Fargate capacity.",
    whyItMatters: "It is a native AWS container platform for services, batch jobs, and microservices.",
    sources: [
      { label: "Amazon ECS", url: "https://docs.aws.amazon.com/ecs/" }
    ],
    aliases: ["ecs", "elastic container service", "aws ecs"]
  },
  aws_fargate: {
    title: "AWS Fargate",
    kind: "AWS serverless container compute",
    definition: "AWS Fargate runs containers without requiring users to manage EC2 instances.",
    whyItMatters: "It simplifies container operations for ECS and EKS workloads.",
    sources: [
      { label: "AWS Fargate", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html" }
    ],
    aliases: ["fargate", "aws fargate"]
  },
  aws_rds: {
    title: "Amazon RDS",
    kind: "AWS managed relational database service",
    definition: "Amazon RDS provides managed relational databases such as PostgreSQL, MySQL, MariaDB, Oracle, and SQL Server.",
    whyItMatters: "It offloads database operations like backups, patching, replication, and high availability.",
    sources: [
      { label: "Amazon RDS", url: "https://docs.aws.amazon.com/rds/" }
    ],
    aliases: ["rds", "amazon rds", "aurora", "aws aurora"]
  },
  aws_kms: {
    title: "AWS KMS",
    kind: "AWS key management service",
    definition: "AWS KMS creates and manages cryptographic keys used to protect AWS data and applications.",
    whyItMatters: "It is central to encryption, key policy, compliance, and data protection in AWS.",
    sources: [
      { label: "AWS KMS", url: "https://docs.aws.amazon.com/kms/" }
    ],
    aliases: ["kms", "aws kms", "key management service", "cmk", "kms key"]
  },
  aws_guardduty: {
    title: "Amazon GuardDuty",
    kind: "AWS threat detection service",
    definition: "GuardDuty analyzes AWS telemetry to detect suspicious activity and potential threats.",
    whyItMatters: "It provides managed threat detection for accounts, workloads, identities, network activity, and data sources.",
    sources: [
      { label: "Amazon GuardDuty", url: "https://docs.aws.amazon.com/guardduty/" }
    ],
    aliases: ["guardduty", "aws threat detection"]
  },
  gcp_iam: {
    title: "Google Cloud IAM",
    kind: "GCP identity and access management service",
    definition: "Google Cloud IAM controls who can access which Google Cloud resources and what actions they can perform.",
    whyItMatters: "IAM is the foundation for least privilege, service accounts, workload identity, and cloud security in GCP.",
    sources: [
      { label: "Google Cloud IAM", url: "https://cloud.google.com/iam/docs" }
    ],
    aliases: ["gcp iam", "google cloud iam", "iam binding", "service account", "workload identity"]
  },
  gcp_shared_vpc: {
    title: "Shared VPC",
    kind: "GCP shared network architecture",
    definition: "Shared VPC lets multiple service projects use a centrally managed VPC network from a host project.",
    whyItMatters: "It supports centralized network governance with decentralized application projects.",
    sources: [
      { label: "Google Cloud Shared VPC", url: "https://cloud.google.com/vpc/docs/shared-vpc" }
    ],
    aliases: ["shared vpc", "gcp shared vpc", "host project", "service project"]
  },
  gcp_private_service_connect: {
    title: "Private Service Connect",
    kind: "GCP private service access",
    definition: "Private Service Connect provides private connectivity to services across VPC networks, organizations, or Google APIs.",
    whyItMatters: "It enables private service consumption without exposing traffic over the public internet.",
    sources: [
      { label: "Google Private Service Connect", url: "https://cloud.google.com/vpc/docs/private-service-connect" }
    ],
    aliases: ["private service connect", "psc", "gcp psc"]
  },
  gcp_cloud_run: {
    title: "Cloud Run",
    kind: "GCP serverless container platform",
    definition: "Cloud Run runs containerized applications in a serverless environment.",
    whyItMatters: "It is a simple way to deploy stateless containers with autoscaling and managed infrastructure.",
    sources: [
      { label: "Google Cloud Run", url: "https://cloud.google.com/run/docs" }
    ],
    aliases: ["cloud run", "gcp cloud run"]
  },
  gcp_pubsub: {
    title: "Pub/Sub",
    kind: "GCP messaging service",
    definition: "Pub/Sub is Google Cloud's asynchronous messaging service for publishing and subscribing to events.",
    whyItMatters: "It decouples services and supports event-driven architectures, streaming, and data pipelines.",
    sources: [
      { label: "Google Cloud Pub/Sub", url: "https://cloud.google.com/pubsub/docs" }
    ],
    aliases: ["pubsub", "pub/sub", "cloud pubsub", "cloud pub/sub", "gcp pubsub"]
  },
  gcp_bigquery: {
    title: "BigQuery",
    kind: "GCP serverless data warehouse",
    definition: "BigQuery is Google Cloud's serverless data warehouse for analytics over large datasets.",
    whyItMatters: "It is widely used for log analytics, business intelligence, data lakes, and security analytics.",
    sources: [
      { label: "Google BigQuery", url: "https://cloud.google.com/bigquery/docs" }
    ],
    aliases: ["bigquery", "bq", "gcp bigquery"]
  },
  gcp_cloud_storage: {
    title: "Cloud Storage",
    kind: "GCP object storage service",
    definition: "Cloud Storage stores objects in buckets with global access patterns and multiple storage classes.",
    whyItMatters: "It is used for backups, static content, artifacts, logs, data lakes, and application storage in GCP.",
    sources: [
      { label: "Google Cloud Storage", url: "https://cloud.google.com/storage/docs" }
    ],
    aliases: ["cloud storage", "gcs", "google cloud storage", "gcs bucket"]
  }
};
