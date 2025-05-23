import{_ as o,c as n,al as i,o as t}from"./chunks/framework.NFAqBSgQ.js";const d=JSON.parse('{"title":"ST Nucle H743ZI2","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/stm32h7/boards/nucleo-h743zi2/index.md","filePath":"en/platforms/arm/stm32h7/boards/nucleo-h743zi2/index.md"}'),a={name:"en/platforms/arm/stm32h7/boards/nucleo-h743zi2/index.md"};function r(s,e,l,h,c,u){return t(),n("div",null,e[0]||(e[0]=[i(`<h1 id="st-nucle-h743zi2" tabindex="-1">ST Nucle H743ZI2 <a class="header-anchor" href="#st-nucle-h743zi2" aria-label="Permalink to &quot;ST Nucle H743ZI2&quot;">​</a></h1><p>chip:stm32, chip:stm32h7, chip:stm32h743</p><p>This page discusses issues unique to NuttX configurations for the STMicro NUCLEO-H743ZI2 development board featuring the STM32H743ZI MCU. The STM32H743ZI is a 400MHz Cortex-M7 operation with 2MBytes Flash memory and 1MByte SRAM. The board features:</p><ul><li>On-board ST-LINK/V2 for programming and debugging,</li><li>3 user LEDs</li><li>Two pushbuttons (user and reset)</li><li>32.768 kHz crystal oscillator</li><li>USB OTG FS with Micro-AB connectors</li><li>Ethernet connector compliant with IEEE-802.3-2002</li><li>Board connectors: <ul><li>USB with Micro-AB</li><li>SWD</li><li>Ethernet RJ45</li><li>ST Zio connector including Arduino Uno V3</li><li>ST morpho</li></ul></li></ul><p>Refer to the <a href="http://www.st.com" target="_blank" rel="noreferrer">http://www.st.com</a> website for further information about this board (search keyword: NUCLEO-H743ZI2)</p><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>Many options are available for a serial console via the Morpho connector. Here two common serial console options are suggested:</p><ol><li><p>Arduino Serial Shield.</p><p>If you are using a standard Arduino RS-232 shield with the serial interface with RX on pin D0 and TX on pin D1 from USART6:</p><blockquote><p>ARDUINO FUNCTION GPIO</p><hr><p>DO RX USART6_RX PG9 D1 TX USART6_TX PG14</p></blockquote></li><li><p>Nucleo Virtual Console.</p><p>The virtual console uses Serial Port 3 (USART3) with TX on PD8 and RX on PD9.</p><blockquote><p>VCOM Signal Pin</p><hr><p>SERIAL_RX PD9 SERIAL_TX PD8</p></blockquote><p>These signals are internally connected to the on board ST-Link.</p><p>The Nucleo virtual console is the default serial console in all configurations unless otherwise stated in the description of the configuration.</p></li></ol><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="nsh" tabindex="-1">nsh: <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh:&quot;">​</a></h3><p>This configuration provides a basic NuttShell configuration (NSH) for the Nucleo-H743ZI. The default console is the VCOM on USART3.</p><h3 id="jumbo" tabindex="-1">jumbo: <a class="header-anchor" href="#jumbo" aria-label="Permalink to &quot;jumbo:&quot;">​</a></h3><p>This configuration enables many Apache NuttX features. This is mostly to help provide additional code coverage in CI, but also allows for a users to see a wide range of features that are supported by the OS.</p><p>Some highlights:</p><p>:</p><pre><code>NSH:

:   -   Readline with tab completion
    -   Readline command history

Performance and Monitoring:

:   -   RAM backed syslog
    -   Syslog with process name, priority, and timestamp
    -   Process Snapshot with stack usage, cpu usage, and signal
        information
    -   Interrupt Statistics
    -   procfs filesystem (required for ifconfig, ifup/ifdown)

Networking:

:   -   IPv4 Networking
    -   Ethernet
    -   DHCP Client
    -   iperf
    -   telnet daemon

File Systems:

:   -   FAT filesystem
    -   LittleFS
    -   RAM MTD device

Testing:

:   -   OS Test with FPU support
    -   Filesystem testing

USB Host:

:   -   USB Hub support
    -   Mass Storage Device
    -   Trace Monitoring
</code></pre>`,16)]))}const f=o(a,[["render",r]]);export{d as __pageData,f as default};
