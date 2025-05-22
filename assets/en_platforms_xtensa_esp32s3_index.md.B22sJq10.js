import{_ as a,c as t,al as n,o as s}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"Espressif ESP32-S3","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/xtensa/esp32s3/index.md","filePath":"en/platforms/xtensa/esp32s3/index.md"}'),o={name:"en/platforms/xtensa/esp32s3/index.md"};function i(r,e,c,p,d,l){return s(),t("div",null,e[0]||(e[0]=[n(`<h1 id="espressif-esp32-s3" tabindex="-1">Espressif ESP32-S3 <a class="header-anchor" href="#espressif-esp32-s3" aria-label="Permalink to &quot;Espressif ESP32-S3&quot;">​</a></h1><p>The ESP32-S3 is a series of single and dual-core SoCs from Espressif based on Harvard architecture Xtensa LX7 CPUs and with on-chip support for Bluetooth and Wi-Fi.</p><p>All embedded memory, external memory and peripherals are located on the data bus and/or the instruction bus of these CPUs. With some minor exceptions, the address mapping of two CPUs is symmetric, meaning they use the same addresses to access the same memory. Multiple peripherals in the system can access embedded memory via DMA.</p><p>On dual-core SoCs, the two CPUs are typically named &quot;PRO_CPU&quot; and &quot;APP_CPU&quot; (for &quot;protocol&quot; and &quot;application&quot;), however for most purposes the two CPUs are interchangeable.</p><h2 id="esp32-s3-toolchain" tabindex="-1">ESP32-S3 Toolchain <a class="header-anchor" href="#esp32-s3-toolchain" aria-label="Permalink to &quot;ESP32-S3 Toolchain&quot;">​</a></h2><p>The toolchain used to build ESP32-S3 firmware can be either downloaded or built from the sources. It is <strong>highly</strong> recommended to use (download or build) the same toolchain version that is being used by the NuttX CI.</p><p>Please refer to the Docker <a href="https://github.com/apache/nuttx/tree/master/tools/ci/docker/linux/Dockerfile" target="_blank" rel="noreferrer">container</a> and check for the current compiler version being used. For instance:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>###############################################################################</span></span>
<span class="line"><span># Build image for tool required by ESP32 builds</span></span>
<span class="line"><span>###############################################################################</span></span>
<span class="line"><span>FROM nuttx-toolchain-base AS nuttx-toolchain-esp32</span></span>
<span class="line"><span># Download the latest ESP32 GCC toolchain prebuilt by Espressif</span></span>
<span class="line"><span>RUN mkdir -p xtensa-esp32-elf-gcc &amp;&amp; \\</span></span>
<span class="line"><span>  curl -s -L &quot;https://github.com/espressif/crosstool-NG/releases/download/esp-12.2.0_20230208/xtensa-esp32-elf-12.2.0_20230208-x86_64-linux-gnu.tar.xz&quot; \\</span></span>
<span class="line"><span>  | tar -C xtensa-esp32-elf-gcc --strip-components 1 -xJ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUN mkdir -p xtensa-esp32s2-elf-gcc &amp;&amp; \\</span></span>
<span class="line"><span>  curl -s -L &quot;https://github.com/espressif/crosstool-NG/releases/download/esp-12.2.0_20230208/xtensa-esp32s2-elf-12.2.0_20230208-x86_64-linux-gnu.tar.xz&quot; \\</span></span>
<span class="line"><span>  | tar -C xtensa-esp32s2-elf-gcc --strip-components 1 -xJ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUN mkdir -p xtensa-esp32s3-elf-gcc &amp;&amp; \\</span></span>
<span class="line"><span>  curl -s -L &quot;https://github.com/espressif/crosstool-NG/releases/download/esp-12.2.0_20230208/xtensa-esp32s3-elf-12.2.0_20230208-x86_64-linux-gnu.tar.xz&quot; \\</span></span>
<span class="line"><span>  | tar -C xtensa-esp32s3-elf-gcc --strip-components 1 -xJ</span></span></code></pre></div><p>For ESP32-S3, the toolchain version is based on GGC 12.2.0 (<code>xtensa-esp32s3-elf-12.2.0_20230208</code>)</p><h3 id="the-prebuilt-toolchain-recommended" tabindex="-1">The prebuilt Toolchain (Recommended) <a class="header-anchor" href="#the-prebuilt-toolchain-recommended" aria-label="Permalink to &quot;The prebuilt Toolchain (Recommended)&quot;">​</a></h3><p>First, create a directory to hold the toolchain:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> mkdir -p /path/to/your/toolchain/xtensa-esp32s3-elf-gcc</span></span></code></pre></div><p>Download and extract toolchain:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> curl -s -L &quot;https://github.com/espressif/crosstool-NG/releases/download/esp-12.2.0_20230208/xtensa-esp32s3-elf-12.2.0_20230208-x86_64-linux-gnu.tar.xz&quot; \\</span></span>
<span class="line"><span>| tar -C xtensa-esp32s3-elf-gcc --strip-components 1 -xJ</span></span></code></pre></div><p>Add the toolchain to your \`PATH\`:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> echo &quot;export PATH=/path/to/your/toolchain/xtensa-esp32s3-elf-gcc/bin:PATH&quot; &gt;&gt; ~/.bashrc</span></span></code></pre></div><p>You can edit your shell&#39;s rc files if you don&#39;t use bash.</p><h3 id="building-from-source" tabindex="-1">Building from source <a class="header-anchor" href="#building-from-source" aria-label="Permalink to &quot;Building from source&quot;">​</a></h3><p>You can also build the toolchain yourself. The steps to build the toolchain with crosstool-NG on Linux are as follows</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> git clone https://github.com/espressif/crosstool-NG.git</span></span>
<span class="line"><span> cd crosstool-NG</span></span>
<span class="line"><span> git submodule update --init</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ./bootstrap &amp;&amp; ./configure --enable-local &amp;&amp; make</span></span>
<span class="line"><span></span></span>
<span class="line"><span> ./ct-ng xtensa-esp32s3-elf</span></span>
<span class="line"><span> ./ct-ng build</span></span>
<span class="line"><span></span></span>
<span class="line"><span> chmod -R u+w builds/xtensa-esp32s3-elf</span></span>
<span class="line"><span></span></span>
<span class="line"><span> export PATH=&quot;crosstool-NG/builds/xtensa-esp32-elf/bin:PATH&quot;</span></span></code></pre></div><p>These steps are given in the setup guide in <a href="https://docs.espressif.com/projects/esp-idf/en/latest/get-started/linux-setup-scratch.html" target="_blank" rel="noreferrer">ESP-IDF documentation</a>.</p><h2 id="building-and-flashing-nuttx" tabindex="-1">Building and flashing NuttX <a class="header-anchor" href="#building-and-flashing-nuttx" aria-label="Permalink to &quot;Building and flashing NuttX&quot;">​</a></h2><h3 id="installing-esptool" tabindex="-1">Installing esptool <a class="header-anchor" href="#installing-esptool" aria-label="Permalink to &quot;Installing esptool&quot;">​</a></h3><p>First, make sure that <code>esptool.py</code> is installed and up-to-date. This tool is used to convert the ELF to a compatible ESP32-S3 image and to flash the image into the board.</p><p>It can be installed with: <code>pip install esptool&gt;=4.8.1</code>.</p><p>Warning</p><p>Installing <code>esptool.py</code> may required a Python virtual environment on newer systems. This will be the case if the <code>pip install</code> command throws an error such as: <code>error: externally-managed-environment</code>.</p><p>If you are not familiar with virtual environments, refer to <a href="./.html">Managing esptool on virtual environment</a> for instructions on how to install <code>esptool.py</code>.</p><h3 id="bootloader-and-partitions" tabindex="-1">Bootloader and partitions <a class="header-anchor" href="#bootloader-and-partitions" aria-label="Permalink to &quot;Bootloader and partitions&quot;">​</a></h3><p>NuttX can boot the ESP32-S3 directly using the so-called &quot;Simple Boot&quot;. An externally-built 2nd stage bootloader is not required in this case as all functions required to boot the device are built within NuttX. Simple boot does not require any specific configuration (it is selectable by default if no other 2nd stage bootloader is used).</p><p>If other features are required, an externally-built 2nd stage bootloader is needed. The bootloader is built using the <code>make bootloader</code> command. This command generates the firmware in the <code>nuttx</code> folder. The <code>ESPTOOL_BINDIR</code> is used in the <code>make flash</code> command to specify the path to the bootloader. For compatibility among other SoCs and future options of 2nd stage bootloaders, the commands <code>make bootloader</code> and the <code>ESPTOOL_BINDIR</code> option (for the <code>make flash</code>) can be used even if no externally-built 2nd stage bootloader is being built (they will be ignored if Simple Boot is used, for instance):</p><pre><code> make bootloader
</code></pre><p>Note</p><p>It is recommended that if this is the first time you are using the board with NuttX to perform a complete SPI FLASH erase.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> esptool.py erase_flash</span></span></code></pre></div><h3 id="building-and-flashing" tabindex="-1">Building and Flashing <a class="header-anchor" href="#building-and-flashing" aria-label="Permalink to &quot;Building and Flashing&quot;">​</a></h3><p>This is a two-step process where the first step converts the ELF file into an ESP32-S3 compatible binary and the second step flashes it to the board. These steps are included in the build system and it is possible to build and flash the NuttX firmware simply by running:</p><pre><code> make flash ESPTOOL_PORT=&lt;port&gt; ESPTOOL_BINDIR=./
</code></pre><p>where:</p><ul><li><code>ESPTOOL_PORT</code> is typically <code>/dev/ttyUSB0</code> or similar.</li><li><code>ESPTOOL_BINDIR=./</code> is the path of the externally-built 2nd stage bootloader and the partition table (if applicable): when built using the <code>make bootloader</code>, these files are placed into <code>nuttx</code> folder.</li><li><code>ESPTOOL_BAUD</code> is able to change the flash baud rate if desired.</li></ul><h3 id="flashing-nsh-example" tabindex="-1">Flashing NSH Example <a class="header-anchor" href="#flashing-nsh-example" aria-label="Permalink to &quot;Flashing NSH Example&quot;">​</a></h3><p>This example shows how to build and flash the <code>nsh</code> defconfig for the ESP32-S3-DevKitC-1 board:</p><pre><code> cd nuttx
 make distclean
 ./tools/configure.sh esp32s3-devkit:nsh
 make -j(nproc)
</code></pre><p>When the build is complete, the firmware can be flashed to the board using the command:</p><pre><code> make -j(nproc) flash ESPTOOL_PORT=&lt;port&gt; ESPTOOL_BINDIR=./
</code></pre><p>where <code>&lt;port&gt;</code> is the serial port where the board is connected:</p><pre><code> make flash ESPTOOL_PORT=/dev/ttyUSB0 ESPTOOL_BINDIR=./
CP: nuttx.hex
MKIMAGE: ESP32-S3 binary
esptool.py -c esp32s3 elf2image --ram-only-header -fs 4MB -fm dio -ff 40m -o nuttx.bin nuttx
esptool.py v4.8.1
Creating esp32s3 image...
Image has only RAM segments visible. ROM segments are hidden and SHA256 digest is not appended.
Merged 1 ELF section
Successfully created esp32s3 image.
Generated: nuttx.bin
esptool.py -c esp32s3 -p /dev/ttyUSB0 -b 921600  write_flash -fs detect -fm dio -ff 40m 0x0000 nuttx.bin
esptool.py v4.8.1
Serial port /dev/ttyUSB0
Connecting....
Chip is ESP32-S3 (QFN56) (revision v0.1)
[...]
Flash will be erased from 0x00000000 to 0x00032fff...
Flash params set to 0x0230
Compressed 206776 bytes to 74469...
Wrote 206776 bytes (74469 compressed) at 0x00000000 in 2.7 seconds (effective 620.3 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
</code></pre><p>Now opening the serial port with a terminal emulator should show the NuttX console:</p><pre><code> picocom -b 115200 /dev/ttyUSB0
NuttShell (NSH) NuttX-12.8.0
nsh&gt; uname -a
NuttX 12.8.0 759d37b97c-dirty Mar  5 2025 20:23:46 xtensa esp32s3-devkit
</code></pre><h2 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h2><p>This section describes debugging techniques for the ESP32-S3.</p><h3 id="debugging-with-openocd-and-gdb" tabindex="-1">Debugging with <code>openocd</code> and <code>gdb</code> <a class="header-anchor" href="#debugging-with-openocd-and-gdb" aria-label="Permalink to &quot;Debugging with \`openocd\` and \`gdb\`&quot;">​</a></h3><p>Espressif uses a specific version of OpenOCD to support ESP32-S3: <a href="https://github.com/espressif/" target="_blank" rel="noreferrer">openocd-esp32</a>.</p><p>Please check <a href="https://docs.espressif.com/projects/esp-idf/en/release-v5.1/esp32s3/api-guides/jtag-debugging/index.html#jtag-debugging-building-openocd" target="_blank" rel="noreferrer">Building OpenOCD from Sources</a> for more information on how to build OpenOCD for ESP32-S3.</p><p>The quickest and most convenient way to start with JTAG debugging is through a USB cable connected to the D+/D- USB pins of ESP32-S3. No need for an external JTAG adapter and extra wiring/cable to connect JTAG to ESP32-S3. Most of the ESP32-S3 boards have a USB connector that can be used for JTAG debugging. This is the case for the <code>ESP32-S3-DevKit &lt;platforms/xtensa/esp32s3/boards/esp32s3-devkit/index:ESP32S3-DevKit&gt;</code>{.interpreted-text role=&quot;ref&quot;} board.</p><p>Note</p><p>One must configure the USB drivers to enable JTAG communication. Please check <a href="https://docs.espressif.com/projects/esp-idf/en/release-v5.1/esp32s3/api-guides/jtag-debugging/configure-builtin-jtag.html?highlight=udev#configure-usb-drivers" target="_blank" rel="noreferrer">Configure USB Drivers</a> for more information.</p><p>OpenOCD can then be used:</p><pre><code>openocd -s &lt;tcl_scripts_path&gt; -c &#39;set ESP_RTOS hwthread&#39; -f board/esp32s3-builtin.cfg -c &#39;init; reset halt; esp appimage_offset 0x0&#39;
</code></pre><p>Note</p><p>- <code>appimage_offset</code> should be set to <code>0x0</code> when <code>Simple Boot</code> is used. For MCUboot, this value should be set to <code>CONFIG_ESP32S3_OTA_PRIMARY_SLOT_OFFSET</code> value (<code>0x10000</code> by default). - <code>-s &lt;tcl_scripts_path&gt;</code> defines the path to the OpenOCD scripts. Usually set to [tcl]{.title-ref} if running openocd from its source directory. It can be omitted if [openocd-esp32]{.title-ref} were installed in the system with [sudo make install]{.title-ref}.</p><p>Once OpenOCD is running, you can use GDB to connect to it and debug your application:</p><pre><code>xtensa-esp32s3-elf-gdb -x gdbinit nuttx
</code></pre><p>whereas the content of the <code>gdbinit</code> file is:</p><pre><code>target remote :3333
set remote hardware-watchpoint-limit 2
mon reset halt
flushregs
monitor reset halt
thb nsh_main
c
</code></pre><p>Note</p><p><code>nuttx</code> is the ELF file generated by the build process. Please note that <code>CONFIG_DEBUG_SYMBOLS</code> must be enabled in the <code>menuconfig</code>.</p><p>Please refer to [[/quick](]{.title-ref}/quick.md)start/debugging\` for more information about debugging techniques.</p><h3 id="stack-dump-and-backtrace-dump" tabindex="-1">Stack Dump and Backtrace Dump <a class="header-anchor" href="#stack-dump-and-backtrace-dump" aria-label="Permalink to &quot;Stack Dump and Backtrace Dump&quot;">​</a></h3><p>NuttX has a feature to dump the stack of a task and to dump the backtrace of it (and of all the other tasks). This feature is useful to debug the system when it is not behaving as expected, especially when it is crashing.</p><p>In order to enable this feature, the following options must be enabled in the NuttX configuration: <code>CONFIG_SCHED_BACKTRACE</code>, <code>CONFIG_DEBUG_SYMBOLS</code> and, optionally, <code>CONFIG_ALLSYMS</code>.</p><p>Note</p><p>The first two options enable the backtrace dump. The third option enables the backtrace dump with the associated symbols, but increases the size of the generated NuttX binary.</p><p>Espressif also provides a tool to translate the backtrace dump into a human-readable format. This tool is called <code>btdecode.sh</code> and is available at <code>tools/espressif/btdecode.sh</code> of NuttX repository.</p><p>Note</p><p>This tool is not necessary if <code>CONFIG_ALLSYMS</code> is enabled. In this case, the backtrace dump contains the function names.</p><h4 id="example-crash-dump" tabindex="-1">Example - Crash Dump <a class="header-anchor" href="#example-crash-dump" aria-label="Permalink to &quot;Example - Crash Dump&quot;">​</a></h4><p>A typical crash dump, caused by an illegal load with <code>CONFIG_SCHED_BACKTRACE</code> and <code>CONFIG_DEBUG_SYMBOLS</code> enabled, is shown below:</p><pre><code>xtensa_user_panic: User Exception: EXCCAUSE=001d task: backtrace
_assert: Current Version: NuttX  10.4.0 2ae3246e40-dirty Sep 19 2024 14:19:27 xtensa
_assert: Assertion failed user panic: at file: :0 task: backtrace process: backtrace 0x42020c90
up_dump_register:    PC: 42020cc0    PS: 00060930
up_dump_register:    A0: 82012d10    A1: 3fc8e2e0    A2: 00000000    A3: 3fc8d350
up_dump_register:    A4: 3fc8d366    A5: 3fc8c900    A6: 00000000    A7: 00000000
up_dump_register:    A8: 82020cbd    A9: 3fc8e2b0   A10: 0000005a   A11: 3fc8d108
up_dump_register:   A12: 00000059   A13: 3fc8ca50   A14: 00000002   A15: 3fc8cefc
up_dump_register:   SAR: 00000018 CAUSE: 0000001d VADDR: 00000000
up_dump_register:  LBEG: 40056f08  LEND: 40056f12  LCNT: 00000000
dump_stack: User Stack:
dump_stack:   base: 0x3fc8d370
dump_stack:   size: 00004048
dump_stack:     sp: 0x3fc8e2e0
stack_dump: 0x3fc8e2c0: 00000059 3fc8ca50 00000002 3fc8cefc 82011ba0 3fc8e300 42020c90 00000002
stack_dump: 0x3fc8e2e0: 3fc8d366 3fc8c900 00000000 00000000 00000000 3fc8e320 00000000 42020c90
stack_dump: 0x3fc8e300: 3fc8d350 3fc8cf40 00000000 3fc8912c 00000000 3fc8e340 00000000 00000000
stack_dump: 0x3fc8e320: 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
stack_dump: 0x3fc8e340: 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
sched_dumpstack: backtrace| 2: 0x4201fc6c 0x403773a0 0x40376f69 0x40376ee1 0x40374ca9 0x42020cc0 0x42012d10 0x42011ba0
sched_dumpstack: backtrace| 2: 0x40000000 0x40000000 0x42012d10 0x42011ba0 0x40000000 0x40000000
dump_tasks:    PID GROUP PRI POLICY   TYPE    NPX STATE   EVENT      SIGMASK          STACKBASE  STACKSIZE   COMMAND
dump_tasks:   ----   --- --- -------- ------- --- ------- ---------- ---------------- 0x3fc8b220      2048   irq
dump_task:       0     0   0 FIFO     Kthread - Ready              0000000000000000 0x3fc8a630      3056   Idle_Task
dump_task:       1     1 100 RR       Task    - Waiting Semaphore  0000000000000000 0x3fc8c468      1992   nsh_main
dump_task:       2     2 255 RR       Task    - Running            0000000000000000 0x3fc8d370      4048   backtrace task
sched_dumpstack: backtrace| 0: 0x42010f37 0x40374dda 0x40374e9a 0x40045c04 0x40043ab9 0x40034c48 0x40000000
sched_dumpstack: backtrace| 1: 0x4201e131 0x4201e033 0x4201e06c 0x42017056 0x4201685c 0x42016b34 0x42015c50 0x42015ad8
sched_dumpstack: backtrace| 1: 0x42015aa9 0x42012d10 0x42011ba0 0x40000000 0x40000000
sched_dumpstack: backtrace| 2: 0x4201fc6c 0x40377098 0x4201df02 0x403773ed 0x40376f69 0x40376ee1 0x40374ca9 0x42020cc0
sched_dumpstack: backtrace| 2: 0x42012d10 0x42011ba0 0x40000000 0x40000000 0x42012d10 0x42011ba0 0x40000000 0x40000000
</code></pre><p>The lines starting with <code>sched_dumpstack</code> show the backtrace of the tasks. By checking it, it is possible to track the root cause of the crash. Saving this output to a file and using the <code>btdecode.sh</code>:</p><pre><code>./tools/btdecode.sh esp32s3 /tmp/backtrace.txt
Backtrace for task 2:
0x4201fc6c: sched_dumpstack at sched_dumpstack.c:69
0x403773a0: _assert at assert.c:691
0x40376f69: xtensa_user_panic at xtensa_assert.c:188 (discriminator 1)
0x40376ee1: xtensa_user at ??:?
0x40374ca9: _xtensa_user_handler at xtensa_user_handler.S:194
0x42020cc0: assert_on_task at backtrace_main.c:158
 (inlined by) backtrace_main at backtrace_main.c:194
0x42012d10: nxtask_startup at task_startup.c:70
0x42011ba0: nxtask_start at task_start.c:75
0x40000000: ?? ??:0
0x40000000: ?? ??:0
0x42012d10: nxtask_startup at task_startup.c:70
0x42011ba0: nxtask_start at task_start.c:75
0x40000000: ?? ??:0
0x40000000: ?? ??:0

Backtrace dump for all tasks:

Backtrace for task 2:
0x4201fc6c: sched_dumpstack at sched_dumpstack.c:69
0x40377098: dump_backtrace at assert.c:418
0x4201df02: nxsched_foreach at sched_foreach.c:69 (discriminator 2)
0x403773ed: _assert at assert.c:726
0x40376f69: xtensa_user_panic at xtensa_assert.c:188 (discriminator 1)
0x40376ee1: xtensa_user at ??:?
0x40374ca9: _xtensa_user_handler at xtensa_user_handler.S:194
0x42020cc0: assert_on_task at backtrace_main.c:158
 (inlined by) backtrace_main at backtrace_main.c:194
0x42012d10: nxtask_startup at task_startup.c:70
0x42011ba0: nxtask_start at task_start.c:75
0x40000000: ?? ??:0
0x40000000: ?? ??:0
0x42012d10: nxtask_startup at task_startup.c:70
0x42011ba0: nxtask_start at task_start.c:75
0x40000000: ?? ??:0
0x40000000: ?? ??:0

Backtrace for task 1:
0x4201e131: nxsem_wait at sem_wait.c:217
0x4201e033: nxsched_waitpid at sched_waitpid.c:165
0x4201e06c: waitpid at sched_waitpid.c:618
0x42017056: nsh_builtin at nsh_builtin.c:163
0x4201685c: nsh_execute at nsh_parse.c:652
 (inlined by) nsh_parse_command at nsh_parse.c:2840
0x42016b34: nsh_parse at nsh_parse.c:2930
0x42015c50: nsh_session at nsh_session.c:246
0x42015ad8: nsh_consolemain at nsh_consolemain.c:79
0x42015aa9: nsh_main at nsh_main.c:80
0x42012d10: nxtask_startup at task_startup.c:70
0x42011ba0: nxtask_start at task_start.c:75
0x40000000: ?? ??:0
0x40000000: ?? ??:0

Backtrace for task 0:
0x42010f37: nx_start at nx_start.c:772 (discriminator 1)
0x40374dda: __esp32s3_start at esp32s3_start.c:439 (discriminator 1)
0x40374e9a: __start at ??:?
0x40045c04: ?? ??:0
0x40043ab9: ?? ??:0
0x40034c48: ?? ??:0
0x40000000: ?? ??:0
</code></pre><p>The above output shows the backtrace of the tasks. By checking it, it is possible to track the functions that were being executed when the crash occurred.</p><h2 id="using-qemu" tabindex="-1">Using QEMU <a class="header-anchor" href="#using-qemu" aria-label="Permalink to &quot;Using QEMU&quot;">​</a></h2><p>Get or build QEMU from <a href="https://github.com/espressif/qemu/wiki" target="_blank" rel="noreferrer">here</a>. The minimum supported version is 9.0.0.</p><p>Enable the <code>ESP32S3_QEMU_IMAGE</code> config found in <code>Board Selection --&gt; ESP32S3 binary image for QEMU</code>{.interpreted-text role=&quot;menuselection&quot;}.</p><p>Build and generate the QEMU image:</p><pre><code> make bootloader
 make ESPTOOL_BINDIR=.
</code></pre><p>A QEMU-compatible <code>nuttx.merged.bin</code> binary image will be created. It can be run as:</p><pre><code> qemu-system-xtensa -nographic -machine esp32s3 -drive file=nuttx.merged.bin,if=mtd,format=raw
</code></pre><h3 id="qemu-networking" tabindex="-1">QEMU Networking <a class="header-anchor" href="#qemu-networking" aria-label="Permalink to &quot;QEMU Networking&quot;">​</a></h3><p>Networking is possible using the openeth MAC driver. Enable <code>ESP32S3_OPENETH</code> option and set the nic in QEMU:</p><blockquote><p>\\ qemu-system-xtensa -nographic -machine esp32s3 -drive file=nuttx.merged.bin,if=mtd,format=raw -nic user,model=open_eth</p></blockquote><h2 id="peripheral-support" tabindex="-1">Peripheral Support <a class="header-anchor" href="#peripheral-support" aria-label="Permalink to &quot;Peripheral Support&quot;">​</a></h2><p>The following list indicates the state of peripherals&#39; support in NuttX:</p><p>+----------------------+----------------------+----------------------+ | Peripheral | Support | NOTES | +======================+======================+======================+ | ADC AES Bluetooth | &gt; Yes Yes Yes No Yes | Oneshot | | Camera CAN/TWAI DMA | &gt; Yes Yes Yes | | | eFuse GPIO | | | +----------------------+----------------------+----------------------+ | I2C I2S LCD LED/PWM | &gt; Yes Yes No Yes Yes | Master and Slave | | MCPWM Pulse_CNT RMT | &gt; Yes Yes Yes No Yes | mode supported | | RNG RSA RTC SDIO | &gt; No Yes No Yes Yes | | | SD/MMC SHA SPI | &gt; Yes Yes Yes Yes | | | SPIFLASH SPIRAM | | | | Timers Touch UART | | | +----------------------+----------------------+----------------------+ | USB OTG USB SERIAL | &gt; Yes Yes Yes | CDC/ACM console | | Watchdog | | supported | +----------------------+----------------------+----------------------+ | Wi-Fi | &gt; Yes | WPA3-SAE supported | +----------------------+----------------------+----------------------+</p><h3 id="analog-to-digital-converter-adc" tabindex="-1">Analog-to-digital converter (ADC) <a class="header-anchor" href="#analog-to-digital-converter-adc" aria-label="Permalink to &quot;Analog-to-digital converter (ADC)&quot;">​</a></h3><p>Two ADC units are available for the ESP32-S3, each with 10 channels.</p><p>Those units are independent and can be used simultaneously. During bringup, GPIOs for selected channels are configured automatically to be used as ADC inputs. If available, ADC calibration is automatically applied (see <a href="https://docs.espressif.com/projects/esp-idf/en/v5.1/esp32s3/api-reference/peripherals/adc_calibration.html" target="_blank" rel="noreferrer">this page</a> for more details). Otherwise, a simple conversion is applied based on the attenuation and resolution.</p><p>Each ADC unit is accessible using the ADC character driver, which returns data for the enabled channels.</p><p>The ADC unit can be enabled in the menu <code>System Type --&gt; ESP32-S3 Peripheral Selection --&gt; Analog-to-digital converter (ADC)</code>{.interpreted-text role=&quot;menuselection&quot;}.</p><p>Then, it can be customized in the menu <code>System Type --&gt; ADC Configuration</code>{.interpreted-text role=&quot;menuselection&quot;}, which includes operating mode, gain and channels.</p><p>+---------+-----------+-----------+ | Channel | ADC1 GPIO | ADC2 GPIO | +=========+===========+===========+ | 0 | &gt; 1 | &gt; 11 | +---------+-----------+-----------+ | 1 | &gt; 2 | &gt; 12 | +---------+-----------+-----------+ | 2 | &gt; 3 | &gt; 13 | +---------+-----------+-----------+ | 3 | &gt; 4 | &gt; 14 | +---------+-----------+-----------+ | 4 | &gt; 5 | &gt; 15 | +---------+-----------+-----------+ | 5 | &gt; 6 | &gt; 16 | +---------+-----------+-----------+ | 6 | &gt; 7 | &gt; 17 | +---------+-----------+-----------+ | 7 | &gt; 8 | &gt; 18 | +---------+-----------+-----------+ | 8 | &gt; 9 | &gt; 19 | +---------+-----------+-----------+ | 9 | &gt; 10 | &gt; 20 | +---------+-----------+-----------+</p><p>Warning</p><p>Minimum and maximum measurable voltages may saturate around 100 mV and 3000 mV, respectively.</p><h3 id="wi-fi" tabindex="-1">Wi-Fi <a class="header-anchor" href="#wi-fi" aria-label="Permalink to &quot;Wi-Fi&quot;">​</a></h3><p>Tip</p><p>Boards usually expose a <code>wifi</code> defconfig which enables Wi-Fi. On ESP32-S3, SMP is enabled to enhance Wi-Fi performance.</p><p>A standard network interface will be configured and can be initialized such as:</p><pre><code>nsh&gt; ifup wlan0
nsh&gt; wapi psk wlan0 mypasswd 3
nsh&gt; wapi essid wlan0 myssid 1
nsh&gt; renew wlan0
</code></pre><p>In this case a connection to AP with SSID <code>myssid</code> is done, using <code>mypasswd</code> as password. IP address is obtained via DHCP using <code>renew</code> command. You can check the result by running <code>ifconfig</code> afterwards.</p><p>Tip</p><p>Please refer to <code>ESP32 Wi-Fi Station Mode &lt;esp32_wi-fi_sta&gt;</code>{.interpreted-text role=&quot;ref&quot;} for more information.</p><h3 id="wi-fi-softap" tabindex="-1">Wi-Fi SoftAP <a class="header-anchor" href="#wi-fi-softap" aria-label="Permalink to &quot;Wi-Fi SoftAP&quot;">​</a></h3><p>It is possible to use ESP32-S3 as an Access Point (SoftAP).</p><p>Tip</p><p>Boards usually expose a <code>sta_softap</code> defconfig which enables Wi-Fi (STA</p><ul><li>SoftAP). On ESP32-S3, SMP is enabled to enhance Wi-Fi performance.</li></ul><p>If you are using this board config profile you can run these commands to be able to connect your smartphone or laptop to your board:</p><pre><code>nsh&gt; ifup wlan1
nsh&gt; dhcpd_start wlan1
nsh&gt; wapi psk wlan1 mypasswd 3
nsh&gt; wapi essid wlan1 nuttxap 1
</code></pre><p>In this case, you are creating the access point <code>nuttxapp</code> in your board and to connect to it on your smartphone you will be required to type the password <code>mypasswd</code> using WPA2.</p><p>Tip</p><p>Please refer to <code>ESP32 Wi-Fi SoftAP Mode &lt;esp32_wi-fi_softap&gt;</code>{.interpreted-text role=&quot;ref&quot;} for more information.</p><p>The <code>dhcpd_start</code> is necessary to let your board to associate an IP to your smartphone.</p><h3 id="psram" tabindex="-1">PSRAM <a class="header-anchor" href="#psram" aria-label="Permalink to &quot;PSRAM&quot;">​</a></h3><p>The external PSRAM is supported in ESP32-S3. The PSRAM is mapped to the data bus during the boot process. The PSRAM is used as a heap memory and is available for the application.</p><p>Please check the following examples for more information:</p><ul><li><code>esp32s3-devkit:psram_octal &lt;platforms/xtensa/esp32s3/boards/esp32s3-devkit/index:psram_octal&gt;</code>{.interpreted-text role=&quot;ref&quot;}</li><li><code>esp32s3-devkit:psram_quad &lt;platforms/xtensa/esp32s3/boards/esp32s3-devkit/index:psram_quad&gt;</code>{.interpreted-text role=&quot;ref&quot;}</li></ul><h4 id="moving-not-initialized-data-to-the-external-psram" tabindex="-1">Moving not initialized data to the external PSRAM <a class="header-anchor" href="#moving-not-initialized-data-to-the-external-psram" aria-label="Permalink to &quot;Moving not initialized data to the external PSRAM&quot;">​</a></h4><p>Static or global not-initialized data can be moved to the external PSRAM. Usually allocated at the <code>.bss</code> memory segment, this data can be set to another section in the external PSRAM. Set the attribute <code>__attribute__ ((section (&quot;.ext_ram.bss&quot;)))</code> to the variable. For example:</p><pre><code>__attribute__ ((section (&quot;.ext_ram.bss&quot;))) static uint8_t my_data[1024];
</code></pre><p><code>my_data</code> will be allocated in the external PSRAM and can be explicitly initialized on runtime.</p><p>This is particularly useful when the internal RAM is not enough to hold all the data.</p><h2 class="title-ref" id="managing-esptool-on-virtual-environment" tabindex="-1">_[Managing esptool on virtual environment] <a class="header-anchor" href="#managing-esptool-on-virtual-environment" aria-label="Permalink to &quot;\\_[Managing esptool on virtual environment]{.title-ref}&quot;">​</a></h2><p>This section describes how to install <code>esptool</code>, <code>imgtool</code> or any other Python packages in a proper environment.</p><p>Normally, a Linux-based OS would already have Python 3 installed by default. Up to a few years ago, you could simply call <code>pip install</code> to install packages globally. However, this is no longer recommended as it can lead to conflicts between packages and versions. The recommended way to install Python packages is to use a virtual environment.</p><p>A virtual environment is a self-contained directory that contains a Python installation for a particular version of Python, plus a number of additional packages. You can create a virtual environment for each project you are working on, and install the required packages in that environment.</p><p>Two alternatives are explained below, you can select any one of those.</p><h3 id="using-pipx-recommended" tabindex="-1">Using pipx (recommended) <a class="header-anchor" href="#using-pipx-recommended" aria-label="Permalink to &quot;Using pipx (recommended)&quot;">​</a></h3><p><code>pipx</code> is a tool that makes it easy to install Python packages in a virtual environment. To install <code>pipx</code>, you can run the following command (using apt as example):</p><pre><code> apt install pipx
</code></pre><p>Once you have installed <code>pipx</code>, you can use it to install Python packages in a virtual environment. For example, to install the <code>esptool</code> package, you can run the following command:</p><pre><code> pipx install esptool
</code></pre><p>This will create a new virtual environment in the <code>~/.local/pipx/venvs</code> directory, which contains the <code>esptool</code> package. You can now use the <code>esptool</code> command as normal, and so will the build system.</p><p>Make sure to run <code>pipx ensurepath</code> to add the <code>~/.local/bin</code> directory to your <code>PATH</code>. This will allow you to run the <code>esptool</code> command from any directory.</p><h3 id="using-venv-alternative" tabindex="-1">Using venv (alternative) <a class="header-anchor" href="#using-venv-alternative" aria-label="Permalink to &quot;Using venv (alternative)&quot;">​</a></h3><p>To create a virtual environment, you can use the <code>venv</code> module, which is included in the Python standard library. To create a virtual environment, you can run the following command:</p><pre><code> python3 -m venv myenv
</code></pre><p>This will create a new directory called <code>myenv</code> in the current directory, which contains a Python installation and a copy of the Python standard library. To activate the virtual environment, you can run the following command:</p><pre><code> source myenv/bin/activate
</code></pre><p>This will change your shell prompt to indicate that you are now working in the virtual environment. You can now install packages using <code>pip</code>. For example, to install the <code>esptool</code> package, you can run the following command:</p><pre><code> pip install esptool
</code></pre><p>This will install the <code>esptool</code> package in the virtual environment. You can now use the <code>esptool</code> command as normal. When you are finished working in the virtual environment, you can deactivate it by running the following command:</p><pre><code> deactivate
</code></pre><p>This will return your shell prompt to its normal state. You can reactivate the virtual environment at any time by running the <code>source myenv/bin/activate</code> command again. You can also delete the virtual environment by deleting the directory that contains it.</p><h2 id="supported-boards" tabindex="-1">Supported Boards <a class="header-anchor" href="#supported-boards" aria-label="Permalink to &quot;Supported Boards&quot;">​</a></h2><blockquote><p>boards/<em>/</em></p></blockquote>`,156)]))}const m=a(o,[["render",i]]);export{u as __pageData,m as default};
