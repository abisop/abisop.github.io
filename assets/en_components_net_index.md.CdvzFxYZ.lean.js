import{_ as r,c as o,j as e,a as n,o as s}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"Network Support","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/net/index.md","filePath":"en/components/net/index.md"}'),a={name:"en/components/net/index.md"};function c(i,t,l,p,d,k){return s(),o("div",null,t[0]||(t[0]=[e("h1",{id:"network-support",tabindex:"-1"},[n("Network Support "),e("a",{class:"header-anchor",href:"#network-support","aria-label":'Permalink to "Network Support"'},"​")],-1),e("blockquote",null,[e("p",null,"sixlowpan.rst socketcan.rst pkt.rst ipfilter.rst nat.rst netdev.rst netdriver.rst netguardsize.rst netlink.rst slip.rst wqueuedeadlocks.rst tcp_network_perf.rst delay_act_and_tcp_perf.rst")],-1),e("p",null,[e("code",null,"net"),n(" Directory Structure :")],-1),e("pre",null,[e("code",null,`nuttx/
 |
 \`- net/
     |
     +- arp        - Address resolution protocol (IPv4)
     +- bluetooth  - PF_BLUETOOTH socket interface
     +- can        - SocketCAN
     +- devif      - Stack/device interface layer
     +- icmp       - Internet Control Message Protocol (IPv4)
     +- icmpv6     - Internet Control Message Protocol (IPv6)
     +- ieee802154 - PF_IEEE802154 socket interface
     +- igmp       - IGMPv2 client
     +- inet       - PF_INET/PF_INET6 socket interface
     +- ipforward  - IP forwarding logic
     +- ipfrag     - Fragmentation and reassembly
     +- local      - Unix domain (local) sockets
     +- mld        - Multicast Listener Discovery (MLD)
     +- nat        - Network Address Translation (NAT)
     +- neighbor   - Neighbor Discovery Protocol (IPv6)
     +- netdev     - Socket network device interface
     +- netfilter  - Iptables Interface
     +- netlink    - Netlink IPC socket interface
     +- pkt        - "Raw" packet socket support
     +- procfs     - net devices PROCFS support
     +- route      - Routing table support
     +- rpmsg      - Rpmsg domain (remote) sockets
     +- sixlowpan  - 6LoWPAN implementation
     +- socket     - BSD socket interface
     +- tcp        - Transmission Control Protocol
     +- udp        - User Datagram Protocol
     +- usrsock    - User socket API for user-space networking stack
     \`- utils      - Miscellaneous utility functions

  +-------------------------------------------------------------------++------------------------+
  |                     Application layer                             || usrsock daemon         |
  +-------------------------------------------------------------------++------------------------+
  +-------------------------------------------------------------------++----------------+ +-----+
  |                   Socket layer (socket/)                          || /dev/usrsock   | |     |
  +-------------------------------------------------------------------++----------------+ |     |
  +------------++--------------------------------------------------++-------------------+ |     |
  |  Network   || Protocol stacks (arp, ipv6, icmp, pkt, tcp, udp) || usrsock/          | |     |
  |   Device   |+--------------------------------------------------++-------------------+ |     |
  | Interface  |+------------------------------------++---------------------------------+ |     |
  | (netdev/)  ||  Network Device Interface (devif/) || Utilities                       | |     |
  +------------++------------------------------------++---------------------------------+ |     |
  +----------------------------------------------------------------+                      |     |
  |                    Network Device Drivers                      |                      | HAL |
  +----------------------------------------------------------------+                      +-----+
  +----------------------------------------------------------------+ +--------------------------+
  |                    Networking Hardware                         | |  Hardware TCP/IP Stack   |
  +----------------------------------------------------------------+ +--------------------------+
`)],-1)]))}const m=r(a,[["render",c]]);export{f as __pageData,m as default};
