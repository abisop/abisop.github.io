import{_ as t,c as n,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/tiva/boards/tm4c129e-launchpad/README.md","filePath":"en/platforms/arm/tiva/boards/tm4c129e-launchpad/README.md"}'),i={name:"en/platforms/arm/tiva/boards/tm4c129e-launchpad/README.md"};function r(s,e,l,d,h,c){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><p>This is the README file for a port of NuttX to the TM4C129E Crypto Connected LaunchPad (more correctly, the EK-TM4C129EXL). For more information about this board, see <a href="https://www.ti.com/tool/EK-TM4C129EXL" target="_blank" rel="noreferrer">https://www.ti.com/tool/EK-TM4C129EXL</a>.</p><h1 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h1><ul><li>EK-TM4C1294XL and DK-TM4C129X</li><li>Status</li><li>Directory Structure</li><li>Development Environment <ul><li>Toolchains</li><li>Debugging</li></ul></li><li>Hardware <ul><li>MCU Clocking</li><li>Serial Console</li><li>GPIOs</li><li>Buttons</li><li>LEDs</li><li>GPIOs</li></ul></li><li>Configurations <ul><li>nsh</li><li>ipv6</li><li>ostest</li></ul></li></ul><h1 id="ek-tm4c1294xl-and-dk-tm4c129x" tabindex="-1">EK-TM4C1294XL and DK-TM4C129X <a class="header-anchor" href="#ek-tm4c1294xl-and-dk-tm4c129x" aria-label="Permalink to &quot;EK-TM4C1294XL and DK-TM4C129X&quot;">​</a></h1><p>This board configuration derives from the EK-TM4C1294XL, which in turn derives from the DK-T4C129X. Refer to the following README files for additional information that may be relevant to this board as well:</p><pre><code>Documentation/platforms/arm/tiva/boards/tm4c1294-launchpad/README.txt
Documentation/platforms/arm/tiva/boards/dk-tm4c129x/README.txt
</code></pre><h1 id="status" tabindex="-1">Status <a class="header-anchor" href="#status" aria-label="Permalink to &quot;Status&quot;">​</a></h1><p>This port boots NuttX through to a functional NSH prompt.</p><h1 id="directory-structure" tabindex="-1">Directory Structure <a class="header-anchor" href="#directory-structure" aria-label="Permalink to &quot;Directory Structure&quot;">​</a></h1><p>Layout for board support package directories: $TOPDIR/boards/ - Directory containing BSP subdirectories arch - CPU architecture (e.g., arm) chip - Chip type (e.g., tiva)</p><p>Within chip subdirectory: <code>&lt;board&gt;</code> - Subdirectory for each board (e.g., LaunchPad129) drivers - Board-specific drivers include - Board-specific headers scripts - Board-specific build scripts (e.g., linker, Make.defs) src - Board-specific code tools - Board-specific tools or scripts (e.g., OpenOCD startup) configs/ - Subdirectory for one or more board configuration(s) &lt;config_1..n&gt; - Configuration for use with tools/configure.sh or .bat</p><h1 id="development-environment" tabindex="-1">Development Environment <a class="header-anchor" href="#development-environment" aria-label="Permalink to &quot;Development Environment&quot;">​</a></h1><h2 id="toolchains" tabindex="-1">Toolchains <a class="header-anchor" href="#toolchains" aria-label="Permalink to &quot;Toolchains&quot;">​</a></h2><p>An appropriate ARM toolchain is needed, such as:</p><ul><li><p>The toolchain built with the customized NuttX buildroot</p></li><li><p>The ready-made GNU Tools for Arm Embedded Processors: <a href="https://developer.arm.com/Tools%20and%20Software/GNU%20Toolchain" target="_blank" rel="noreferrer">https://developer.arm.com/Tools and Software/GNU Toolchain</a></p></li><li><p>The toolchain that installs with Texas Instruments Code Composer Studio (CCS): <a href="https://www.ti.com/tool/CCSTUDIO" target="_blank" rel="noreferrer">https://www.ti.com/tool/CCSTUDIO</a></p></li></ul><p>Debugging ---------</p><p>The board incorporates an In-Circuit Debug Interface (ICDI) which allows FLASH programming and JTAG debugging. This is accessible via the Micro-USB Type B connector labeled DEBUG (opposite end of the board from the Ethernet port). The ICDI interface is implemented by a TM4C123G microcontroller.</p><p>To debug with OpenOCD and arm-nuttx-eabi-gdb:</p><ul><li><p>Use &#39;make menuconfig&#39; to set CONFIG_DEBUG_SYMBOLS and CONFIG_DEBUG_NOOPT. To see debug output, e.g., the &quot;ABCDE&quot; printed in __start(), also set CONFIG_DEBUG_FEATURES.</p></li><li><p>Build NuttX.</p></li><li><p>Flash the code using: $ openocd -f board/ek-tm4c1294xl.cfg -c &quot;init&quot; -c &quot;reset halt&quot;<br> -c &quot;stellaris mass_erase 0&quot; -c &quot;flash write_bank 0 nuttx.bin&quot;</p><p>NOTE: The above command might fail unless either: udev rules have been configured on the development system (preferred) or the command is run as root with &#39;sudo&#39; (not encouraged). See:</p><ul><li><a href="https://openocd.org/doc/html/Running.html" target="_blank" rel="noreferrer">https://openocd.org/doc/html/Running.html</a></li><li><a href="https://forgge.github.io/theCore/guides/running-openocd-without-sudo.html" target="_blank" rel="noreferrer">https://forgge.github.io/theCore/guides/running-openocd-without-sudo.html</a></li></ul></li><li><p>Start GDB with: $ arm-nuttx-eabi-gdb -tui nuttx</p></li><li><p>In GDB: (gdb) target remote localhost:3333 (gdb) monitor reset halt (gdb) load</p></li></ul><h1 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-label="Permalink to &quot;Hardware&quot;">​</a></h1><p>MCU Clocking ------------</p><pre><code>By default, the MCU on this board is clocked from 25 MHz crystal Y1, also
required for clocking the TM4C129&#39;s internal Ethernet MAC and PHY. For core
and peripheral timing, the MCU&#39;s internal PLL multiplies this 25 MHz clock
to 120 MHz.

The MCU&#39;s Hibernation peripheral is clocked from 32.768-KHz crystal Y3.
</code></pre><p>Serial Console --------------</p><pre><code>These configurations use UART0 for the serial console.

By default (check jumper settings on the board), UART0 is connected to the
on-board ICDI interface and is forwarded through the ICDI virtual UART. On
the PC, this appears a Virtual COM Port over the same Micro-USB Type B
connection used for programming/debugging.

On Debian Linux, this shows up as /dev/ttyACM0. Other operating systems may
differ.
</code></pre><p>Buttons -------</p><pre><code>The board has two on-board pushbuttons accessible to software. These are
connected to GPIO pins PJ0 and PJ1.

In addition, the board also has a Reset switch and a Wake switch. The Reset
switch asserts the reset signal to the microcontroller, the Breadboard
headers, and the BoosterPack headers and, therefore, any attached
BoosterPack boards. The Wake switch is provided as one of the means to wake
the microcontroller from hibernate mode.
</code></pre><p>LEDs ----</p><pre><code>The board has four LEDs which are accessible to software. LEDs D1 and D2 are
connected to GPIOs PN1 and PN0 and are dedicated for software use. LEDs D3
and D4 are connected to GPIOs PF4 and PF0 and can be controlled either by
software or by the integrated Ethernet PHY of the TM4C129ENCPDT.
</code></pre><p>GPIOs -----</p><pre><code>The board exposes almost all MCU pins to the breadboard and BoosterPack
connectors.
</code></pre><h1 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h1><p>Each EK-TM4C129EXL configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh tm4c129e-launchpad:&lt;subdir&gt;
</code></pre><p>Where <code>&lt;subdir&gt;</code> is one of the following:</p><h2 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h2><p>Configures the NuttShell (nsh) located at apps/examples/nsh. The configuration enables the serial ICDI virtual UART on UART0. Support for builtin applications is enabled, but in the base configuration no builtin applications are selected.</p><pre><code>NOTES:

1. This configuration uses the mconf-based configuration tool. To change
   this configuration using that tool, you should:

   a. Build and install the kconfig-mconf tool. See nuttx/README.txt see
      additional README.txt files in the NuttX tools repository.

   b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the
      reconfiguration process.

2. By default, this configuration uses the GNU ARM EABI toolchain
   (Linaro) such as the one delivered with TI&#39;s Code Composer
   Studio (CCS) and builds under Linux. (Cygwin / MSYS / MSYS2 under
   Windows might work as well.) These options can be reconfigured
   with &#39;make menuconfig&#39; as described above.

   CONFIG_HOST_LINUX=y                 : Linux (Cygwin under Windows okay too).
   CONFIG_ARCH_TOOLCHAIN_GNU=y         : GNU toolchain (arm-none-eabi-gcc)
   CONFIG_ARM_TOOLCHAIN_GNU_EABIL=y
   CONFIG_RAW_BINARY=y                 : Output formats: ELF and raw binary

3. Default stack sizes are large and should really be tuned to reduce the
   RAM footprint:

     CONFIG_SCHED_HPWORKSTACKSIZE=2048
     CONFIG_IDLETHREAD_STACKSIZE=1024
     CONFIG_INIT_STACKSIZE=2048
     CONFIG_PTHREAD_STACK_DEFAULT=2048
     CONFIG_POSIX_SPAWN_DEFAULT_STACKSIZE=2048
     CONFIG_BUILTIN_PROXY_STACKSIZE=1024
     CONFIG_SYSTEM_TELNETD_STACKSIZE=2048
     CONFIG_SYSTEM_TELNETD_SESSION_STACKSIZE=2048

4. This configuration has the network enabled by default. See the paragraph
   &quot;Using the network with NSH&quot; in the DK-TM4C129X README).

   Networking can easily be disabled or reconfigured with &#39;make menuconfig&#39;
   if desired.

   By default:

     This configuration assumes a DHCP network.

     The network initialization thread is enabled. NSH will create
     a separate thread when it starts to initialize the network.
     This eliminates start-up delays to bring up the network.

     The persistent network monitor thread is enabled.  It monitors
     changes in link status, takes the network down when the link is
     lost (e.g., cable disconnected), abd brings the network back up
     when the link becomes available again (e.g., cable connected).

     The Ethernet MAC address is factory-programmed into the non-volatile
     USER0 and USER1 registers. If CONFIG_TIVA_BOARDMAC is defined, the
     function tiva_ethernetmac() will obtain the MAC address from these
     registers and use it.
</code></pre><h2 id="ipv6" tabindex="-1">ipv6: <a class="header-anchor" href="#ipv6" aria-label="Permalink to &quot;ipv6:&quot;">​</a></h2><p>This is another version of the NuttShell configuration. It is very similar to the nsh configuration except that it has IPv6 enabled and IPv4 disabled. Several network utilities that are not yet available under IPv6 are disabled.</p><pre><code>NOTES:

1. As of 2022-09-06, this configuration was identical to the nsh
   configuration other than using IPv6. So all of the notes above regarding
   the nsh configuration apply.

   Telnet does work with IPv6 but is not enabled in this configuration (but
   could be).

2. This configuration can be modified so that both IPv4 and IPv6 are
   supported. Here is a summary of the additional configuration settings
   required to support both IPv4 and IPv6:

     CONFIG_NET_IPv4=y
     CONFIG_NET_ARP=y
     CONFIG_NET_ARP_SEND=y (optional)
     CONFIG_NET_ICMP=y
     CONFIG_NET_ICMP_SOCKET=y

     CONFIG_NETDB_DNSCLIENT=y
     CONFIG_NETUTILS_TELNETD=y

     CONFIG_NSH_IPADDR=0x0a000002
     CONFIG_NSH_DRIPADDR=0x0a000001
     CONFIG_NSH_NETMASK=0xffffff00
     CONFIG_NSH_TELNET=y

   Then from NSH, you have both ping and ping6 commands:

     nsh&gt; ping 10.0.0.1
     nsh&gt; ping6 fc00::1

   And from the host you can do similar:

     ping 10.0.0.2
     ping6 fc00::2   (Linux)
     ping -6 fc00::2 (Windows cmd)

   and Telnet is now enabled and works from the host... but only using IPv6
   addressing:

     telnet fc00::2

   That is because the Telnet daemon will default to IPv6 and there is no
   Telnet option to let you select which if both IPv4 and IPv6 are enabled.

3. You can enable IPv6 autonomous address configuration with the following
   changes to the configuration:

   + CONFIG_NET_ICMPv6_AUTOCONF=y
   + CONFIG_ICMPv6_AUTOCONF_DELAYMSEC=100
   + CONFIG_ICMPv6_AUTOCONF_MAXTRIES=5

   - CONFIG_NSH_DRIPv6ADDR_1=0xfc00
   - CONFIG_NSH_DRIPv6ADDR_2=0x0000
   - CONFIG_NSH_DRIPv6ADDR_3=0x0000
   - CONFIG_NSH_DRIPv6ADDR_4=0x0000
   - CONFIG_NSH_DRIPv6ADDR_5=0x0000
   - CONFIG_NSH_DRIPv6ADDR_6=0x0000
   - CONFIG_NSH_DRIPv6ADDR_7=0x0000
   - CONFIG_NSH_DRIPv6ADDR_8=0x0001

   - CONFIG_NSH_IPv6ADDR_1=0xfc00
   - CONFIG_NSH_IPv6ADDR_2=0x0000
   - CONFIG_NSH_IPv6ADDR_3=0x0000
   - CONFIG_NSH_IPv6ADDR_4=0x0000
   - CONFIG_NSH_IPv6ADDR_5=0x0000
   - CONFIG_NSH_IPv6ADDR_6=0x0000
   - CONFIG_NSH_IPv6ADDR_7=0x0000
   - CONFIG_NSH_IPv6ADDR_8=0x0002
   - CONFIG_NSH_IPv6NETMASK_1=0xffff
   - CONFIG_NSH_IPv6NETMASK_2=0xffff
   - CONFIG_NSH_IPv6NETMASK_3=0xffff
   - CONFIG_NSH_IPv6NETMASK_4=0xffff
   - CONFIG_NSH_IPv6NETMASK_5=0xffff
   - CONFIG_NSH_IPv6NETMASK_6=0xffff
   - CONFIG_NSH_IPv6NETMASK_7=0xffff
   - CONFIG_NSH_IPv6NETMASK_8=0xff80
</code></pre><h2 id="ostest" tabindex="-1">ostest: <a class="header-anchor" href="#ostest" aria-label="Permalink to &quot;ostest:&quot;">​</a></h2><p>This configuration is the same as &#39;nsh&#39; described above, with the addition of CONFIG_TESTING_OSTEST. This enables the built-in program &#39;ostest&#39; which runs a series of tests to exercise features of the operating system. This configuration also enables several debugging options to assist with diagnosing any failures.</p>`,43)]))}const f=t(i,[["render",r]]);export{p as __pageData,f as default};
