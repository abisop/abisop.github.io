import{_ as t,c as n,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"SIM","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/sim/sim/boards/sim/index.md","filePath":"en/platforms/sim/sim/boards/sim/index.md"}'),s={name:"en/platforms/sim/sim/boards/sim/index.md"};function i(r,e,l,p,c,d){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="sim" tabindex="-1">SIM <a class="header-anchor" href="#sim" aria-label="Permalink to &quot;SIM&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><h3 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h3><p>This README file describes the contents of the build configurations available for the NuttX &quot;sim&quot; target. The sim target is a NuttX port that runs as a user-space program under Linux, Cygwin, or macOS. It is a very &quot;low fidelity&quot; embedded system simulation: This environment does not support any kind of asynchronous events -- there are nothing like interrupts in this context. Therefore, there can be no preempting events.</p><h3 id="fake-interrupts" tabindex="-1">Fake Interrupts <a class="header-anchor" href="#fake-interrupts" aria-label="Permalink to &quot;Fake Interrupts&quot;">​</a></h3><p>In order to get timed behavior, the system timer &quot;interrupt handler&quot; is called from the sim target&#39;s IDLE loop. The IDLE runs whenever there is no other task running. So, for example, if a task calls sleep(), then that task will suspend wanting for the time to elapse. If nothing else is available to run, then the IDLE loop runs and the timer increments, eventually re-awakening the sleeping task.</p><p>Context switching is based on logic similar to setjmp() and longjmp().</p><p>The sim target is used primarily as a development and test platform for new RTOS features. It is also of academic interest. But it has no real-world application that I know of.</p><h3 id="timing-fidelity" tabindex="-1">Timing Fidelity <a class="header-anchor" href="#timing-fidelity" aria-label="Permalink to &quot;Timing Fidelity&quot;">​</a></h3><p>NOTE: The sim target&#39;s IDLE loop to delay on each call so that the system &quot;timer interrupt&quot; is called at a rate approximately correct for the system timer tick rate. This option can be enabled with CONFIG_SIM_WALLTIME_SIGNAL which will drive the entire simulation by using a host timer that ticks at CONFIG_USEC_PER_TICK. This option will no longer deliver &#39;tick&#39; events from Idle task and it will generate them from the host signal handler. Another option is to use CONFIG_SIM_WALLTIME_SLEEP which will enable the tick events to be delayed from the Idle task by using a host sleep call.</p><h2 id="debugging" tabindex="-1">Debugging <a class="header-anchor" href="#debugging" aria-label="Permalink to &quot;Debugging&quot;">​</a></h2><p>One of the best reasons to use the simulation is that is supports great Linux-based debugging. Here are the steps that I following to use the Linux ddd graphical front-end to GDB:</p><ol><li><p>Modify the top-level configuration file. Enable debug symbols by defining the following:</p><pre><code>cd &lt;NuttX-Directory&gt;
CONFIG_DEBUG_SYMBOLS=y
</code></pre></li><li><p>Re-build:</p><pre><code>cd &lt;NuttX-Directory&gt;
make clean
make
</code></pre></li><li><p>Then start the debugging:</p><pre><code>ddd nuttx &amp;
gdb&gt; b user_start
gdb&gt; r
</code></pre></li></ol><p>NOTE: This above steps work fine on Linux, Cygwin, and macOS. On Cygwin, you will need to start the Cygwin-X server before running ddd. On macOS, it&#39;s probably easier to use lldb instead of gdb.</p><h2 id="issues" tabindex="-1">Issues <a class="header-anchor" href="#issues" aria-label="Permalink to &quot;Issues&quot;">​</a></h2><h3 id="_64-bit-issues" tabindex="-1">64-Bit Issues <a class="header-anchor" href="#_64-bit-issues" aria-label="Permalink to &quot;64-Bit Issues&quot;">​</a></h3><p>As mentioned above, context switching is based on logic like setjmp() and longjmp(). This context switching is available for 32-bit and 64-bit targets. You must, however, set the correct target in the configuration before you build: CONFIG_HOST_X86_64 or CONFIG_HOST_X86 for 64- and 32-bit targets, respectively. On a 64-bit machine, you can also force the 32-bit build with CONFIG_SIM_M32=y (which does not seem to be supported by more contemporary x86_64 compilers).</p><p>There are other 64-bit issues as well. For example, addresses are retained in 32-bit unsigned integer types in a few places. On a 64-bit machine, the 32-bit address storage may corrupt 64-bit addressing. NOTE: This is really a bug -- addresses should not be retained in uint32_t types but rather in uintptr_t types to avoid issues just like this.</p><h3 id="compiler-differences" tabindex="-1">Compiler differences <a class="header-anchor" href="#compiler-differences" aria-label="Permalink to &quot;Compiler differences&quot;">​</a></h3><p>operator new:</p><blockquote><p>Problem: &quot;&#39;operator new&#39; takes size_t (&#39;...&#39;) as first parameter&quot;</p><p>Workaround: Add -fpermissive to the compilation flags</p></blockquote><h3 id="stack-size-issues" tabindex="-1">Stack Size Issues <a class="header-anchor" href="#stack-size-issues" aria-label="Permalink to &quot;Stack Size Issues&quot;">​</a></h3><p>When you run the NuttX simulation, it uses stacks allocated by NuttX from the NuttX heap. The memory management model is exactly the same in the simulation as in a real, target system. This is good because this produces a higher fidelity simulation.</p><p>However, when the simulation calls into the host OS libraries, it will still use these small simulation stacks. This happens, for example, when you call into the system to get and put characters to the console window or when you make X11 calls into the system. The programming model within those libraries will assume the host OS environment where the stack size grows dynamically and not the small, limited stacks of a deeply embedded system.</p><p>As a consequence, those system libraries may allocate large data structures on the stack and overflow the small NuttX stacks. X11, in particular, requires large stacks. If you are using X11 in the simulation, make sure that you set aside a &quot;lot&quot; of stack for the X11 library calls (maybe 8 or 16Kb). The stack size for the thread that begins with user start is controlled by the configuration setting CONFIG_INIT_STACKSIZE; you may need to increase this value to larger number to survive the X11 library calls.</p><p>If you are running X11 applications such as NSH add-on programs, then the stack size of the add-on program is controlled in another way. Here are the steps for increasing the stack size in that case:</p><pre><code>cd ../apps/builtin    # Go to the builtin apps directory
vi builtin_list.h     # Edit this file and increase the stack size of the add-on
rm .built *.o         # This will force the builtin apps logic to rebuild
</code></pre><h3 id="symbol-collisions" tabindex="-1">Symbol Collisions <a class="header-anchor" href="#symbol-collisions" aria-label="Permalink to &quot;Symbol Collisions&quot;">​</a></h3><p>The simulation build is a two pass build:</p><blockquote><ol><li>On the first pass, an intermediate, partially relocatable object is created called nuttx.rel. This includes all of the files that are part of the NuttX &quot;domain.&quot;</li><li>On the second pass, the files which are in the host OS domain are built and then linked with nuttx.rel to generate the simulation program.</li></ol></blockquote><p>NuttX is a POSIX compliant RTOS and is normally built on a POSIX compliant host environment (like Linux, Cygwin, or macOS). As a result, the same symbols are exported by both the NuttX domain and the host domain. How can we keep them separate?</p><p>This is done using the special file nuttx-name.dat. This file just contains a mapping of original function names to new function names. For example, the NuttX printf() will get the new name NXprintf().</p><p>This nuttx-names.dat file is used by the objcopy program between pass1 and pass2 to rename all of the symbols in the nuttx.rel object so that they do not collide with names provided by the host OS in the host PC domain.</p><p>Occasionally, as you test new functionality, you will find that you need to add more names to the nuttx-names.dat file. If there is a missing name mapping in nuttx-names.dat, the symptoms may be very obscure and difficult to debug. What happens in this case is that when logic in nuttx.rel intended to call the NuttX domain function, it instead calls into the host OS function of the same name.</p><p>Often you can survive such events. For example, it really should not matter which version of strlen() you call. Other times, it can cause subtle, mysterious errors. Usually, however, callng the wrong function in the wrong OS results in a fatal crash.</p><p>On macOS, instead of objcopy, -unexported_symbols_list linker option is used to hide symbols in the NuttX domain, using the same list of symbols from nuttx-name.dat.</p><h3 id="networking-issues" tabindex="-1">Networking Issues <a class="header-anchor" href="#networking-issues" aria-label="Permalink to &quot;Networking Issues&quot;">​</a></h3><p>I never did get networking to work on the sim target. It tries to use the tap device (/dev/net/tun) to emulate an Ethernet NIC, but I never got it correctly integrated with the NuttX networking. (I probably should try using raw sockets instead.)</p><p>Update: Max Holtzberg reports to me that the tap device actually does work properly, but not in an NSH configuration because stdio operations freeze the simulation.</p><p>REVISIT: This may not long be an issue even with NSH because of the recent redesign of how the stdio devices are handled in the simulation (they should no longer freeze the simulation).</p><p>Update: Please issue these commands to setup the reliable network on Ubuntu:</p><pre><code>sudo apt-get -y install net-tools
sudo nuttx/tools/simbridge.sh eth0 on
</code></pre><p>Here are some tips you may need:</p><blockquote><ol><li>Must launch the executable with the root permission</li><li>Have to use virtual machine if host is in corporation network</li><li>Configure the network adapter in NAT mode if virtual machine is used</li></ol></blockquote><h3 id="x11-issues" tabindex="-1">X11 Issues <a class="header-anchor" href="#x11-issues" aria-label="Permalink to &quot;X11 Issues&quot;">​</a></h3><p>There is an X11-based framebuffer driver that you can use to exercise the NuttX graphics subsystem on the simulator (see the sim/nx11 configuration below). This may require a lot of tinkering to get working, depending upon where your X11 installation stores libraries and header files and how it names libraries.</p><p>For example, on Ubuntu 9.09, I had to do the following to get a clean build:</p><pre><code>cd /usr/lib/
sudo ln -s libXext.so.6.4.0 libXext.so
</code></pre><p>(I also get a segmentation fault at the conclusion of the NX test -- that will need to get looked into as well.)</p><p>The X11 examples builds on Cygwin, but does not run. The last time I tried it, XOpenDisplay() aborted the program. UPDATE: This was caused by the small stack size and can be fixed by increasing the size of the NuttX stack that calls into X11. See the discussion &quot;Stack Size Issues&quot; above.</p><p>Update: You may need issue this command with the latest Ubuntu before launch:</p><pre><code>sudo xhost +
</code></pre><h3 id="cygwin64-issues" tabindex="-1">Cygwin64 Issues <a class="header-anchor" href="#cygwin64-issues" aria-label="Permalink to &quot;Cygwin64 Issues&quot;">​</a></h3><p>There are some additional issues using the simulator with Cygwin64. Below is the summary of the changes that I had to make to get the simulator working in that environment:</p><blockquote><p>CONFIG_HOST_X86_64=y, CONFIG_SIM_M32=n</p><blockquote><p>Need to select X64_64. Cygwin64 tools do not seem to support any option to build a 32-bit target.</p></blockquote><p>CONFIG_SIM_CYGWIN_DECORATED=n</p><blockquote><p>Older versions of Cygwin tools decorated C symbol names by adding an underscore to the beginning of the symbol name. Newer versions of Cygwin do not seem to do this. Deselecting CONFIG_SIM_CYGWIN_DECORATED will select the symbols without the leading underscore as needed by the Cygwin64 toolchain.</p><p>How do you know if you need this option? You could look at the generated symbol tables to see if there are underscore characters at the beginning of the symbol names. Or, if you need this option, the simulation will not run: It will crash early, probably in some function due to the failure to allocate memory.</p><p>In this case, when I tried to run nutt.exe from the command line, it exited silently. Running with GDB I get the following (before hitting a breakpoint at main()):</p><pre><code>(gdb) r
Starting program: /cygdrive/c/Users/Gregory/Documents/projects/nuttx/master/nuttx/nuttx.exe
[New Thread 6512.0xda8]
[New Thread 6512.0x998]
      1 [main] nuttx 6512 C:\\Users\\Gregory\\Documents\\projects\\nuttx\\master\\nuttx\\nuttx.exe: *** fatal error - Internal error: Out of memory for new path buf.
    736 [main] nuttx 6512 cygwin_exception::open_stackdumpfile: Dumping stack trace to nuttx.exe.stackdump
[Thread 6512.0x998 exited with code 256]
[Inferior 1 (process 6512) exited with code 0400]
</code></pre></blockquote><p>CONFIG_SIM_X8664_SYSTEMV=n, CONFIG_SIM_X8664_MICROSOFT=y</p><blockquote><p>Select Microsoft x64 calling convention.</p><p>The Microsoft x64 calling convention is followed on Microsoft Windows and pre-boot UEFI (for long mode on x86-64). It uses registers RCX, RDX, R8, R9 for the first four integer or pointer arguments (in that order), and XMM0, XMM1, XMM2, XMM3 are used for floating point arguments. Additional arguments are pushed onto the stack (right to left). Integer return values (similar to x86) are returned in RAX if 64 bits or less. Floating point return values are returned in XMM0. Parameters less than 64 bits long are not zero extended; the high bits are not zeroed.</p></blockquote></blockquote><h3 id="smp" tabindex="-1">SMP <a class="header-anchor" href="#smp" aria-label="Permalink to &quot;SMP&quot;">​</a></h3><blockquote><p>This configuration has basic support for SMP testing. The simulation supports the emulation of multiple CPUs by creating multiple pthreads, each running a copy of the simulation in the same process address space.</p><p>At present, the SMP simulation is not fully functional: It does operate on the simulated CPU threads for a few context switches then fails during a setjmp() operation. I suspect that this is not an issue with the NuttX SMP logic but more likely some chaos in the pthread controls. I have seen similar such strange behavior other times that I have tried to use setjmp/longmp from a signal handler! Like when I tried to implement simulated interrupts using signals.</p><p>Apparently, if longjmp is invoked from the context of a signal handler, the result is undefined: <a href="http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1318.htm" target="_blank" rel="noreferrer">http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1318.htm</a></p><p>Update: The dead lock is due to up_testset call pthread API for synchronization inside the signal handler. After switching to atomic API, the problem get resolved.</p><p>You can enable SMP for ostest configuration by enabling:</p><pre><code>+CONFIG_SPINLOCK=y
+CONFIG_SMP=y
+CONFIG_SMP_NCPUS=2
</code></pre><p>And you can enable some additional debug output with:</p><pre><code>-# CONFIG_DEBUG_SCHED is not set
+CONFIG_DEBUG_SCHED=y

-# CONFIG_SCHED_INSTRUMENTATION is not set
-# CONFIG_SCHED_INSTRUMENTATION_SWITCH is not set
+CONFIG_SCHED_INSTRUMENTATION=y
+CONFIG_SCHED_INSTRUMENTATION_SWITCH=y
</code></pre><p>The SMP configuration will run with:</p><pre><code>CONFIG_SMP_NCPUS=1
</code></pre><p>In this case there is, of course, no multi-CPU processing, but this does verify the correctness of some of the basic SMP logic.</p><p>The NSH configuration can also be forced to run SMP, but suffers from the same quirky behavior. It can be made reliable if you modify arch/sim/src/up_idle.c so that the IDLE loop only runs for CPU0. Otherwise, often simuart_post() will be called from CPU1 and it will try to restart NSH on CPU0 and, again, the same quirkiness occurs.</p><p>Update: Only CPU0 call up_idle now, other CPUs have a simple idle loop:</p><pre><code>/* The idle Loop */

for (; ; )
  {
    /* Give other pthreads/CPUs a shot */

    pthread_yield();
  }
</code></pre><p>So it isn&#39;t a problem any more.</p><p>But for example, this command:</p><pre><code>nsh&gt; sleep 1 &amp;
</code></pre><p>will execute the sleep command on CPU1 which has worked every time that I have tried it (which is not too many times).</p></blockquote><h2 id="basic" tabindex="-1">BASIC <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;BASIC&quot;">​</a></h2><blockquote><p>I have used the sim/nsh configuration to test Michael Haardt&#39;s BASIC interpreter that you can find at apps/interpreters/bas.</p><blockquote><p>Bas is an interpreter for the classic dialect of the programming language BASIC. It is pretty compatible to typical BASIC interpreters of the 1980s, unlike some other UNIX BASIC interpreters, that implement a different syntax, breaking compatibility to existing programs. Bas offers many ANSI BASIC statements for structured programming, such as procedures, local variables and various loop types. Further there are matrix operations, automatic LIST indentation and many statements and functions found in specific classic dialects. Line numbers are not required.</p></blockquote><p>There is also a test suite for the interpreter that can be found at apps/examples/bastest.</p></blockquote><h3 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-label="Permalink to &quot;Configuration&quot;">​</a></h3><blockquote><p>Below are the recommended configuration changes to use BAS with the stm32f4discovery/nsh configuration:</p><p>Dependencies:</p><pre><code>CONFIG_LIBC_EXECFUNCS=y      : exec*() functions are required
CONFIG_LIBM=y                : Some floating point library is required
CONFIG_LIBC_FLOATINGPOINT=y  : Floating point printing support is required
CONFIG_LIBC_TMPDIR=&quot;/tmp&quot;    : Writeable temporary files needed for some commands
</code></pre><p>Enable the BASIC interpreter. Other default options should be okay:</p><pre><code>CONFIG_INTERPRETERS_BAS=y    : Enables the interpreter
CONFIG_INTERPRETER_BAS_VT100=y
</code></pre><p>The BASIC test suite can be included:</p><pre><code>CONFIG_FS_ROMFS=y           : ROMFS support is needed
CONFIG_EXAMPLES_BASTEST=y   : Enables the BASIC test setup
CONFIG_EXAMPLES_BASTEST_DEVMINOR=6
CONFIG_EXAMPLES_BASTEST_DEVPATH=&quot;/dev/ram6&quot;
</code></pre></blockquote><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h3><blockquote><p>This setup will initialize the BASIC test (optional): This will mount a ROMFS file system at /mnt/romfs that contains the BASIC test files:</p><pre><code>nsh&gt; bastest
Registering romdisk at /dev/ram6
Mounting ROMFS filesystem at target=/mnt/romfs with source=/dev/ram6
nsh&gt;
</code></pre><p>The interactive interpreter is started like:</p><pre><code>nsh&gt; bas
bas 2.4
Copyright 1999-2014 Michael Haardt.
This is free software with ABSOLUTELY NO WARRANTY.
&gt;

Ctrl-D exits the interpreter.

The test programs can be ran like this:

nsh&gt; bastest
Registering romdisk at /dev/ram0
Mounting ROMFS filesystem at target=/mnt/romfs with source=/dev/ram0
nsh&gt; bas /mnt/romfs/test01.bas
 1
hello
 0.0002
 0.0000020
 0.0000002

nsh&gt;
</code></pre><p>Or you can load a test into memory and execute it interactively:</p><pre><code>nsh&gt; bas
bas 2.4
Copyright 1999-2014 Michael Haardt.
This is free software with ABSOLUTELY NO WARRANTY.
&gt; load &quot;/mnt/romfs/test01.bas&quot;
&gt; run
 1
hello
 0.0002
 0.0000020
 0.0000002
&gt;
</code></pre></blockquote><h2 id="common-configuration-information" tabindex="-1">Common Configuration Information <a class="header-anchor" href="#common-configuration-information" aria-label="Permalink to &quot;Common Configuration Information&quot;">​</a></h2><blockquote><ol><li><p>Each configuration is maintained in a sub-directory and can be selected as follow:</p><pre><code>tools/configure.sh sim:&lt;subdir&gt;
</code></pre><p>Where &lt;subdir&gt; is one of the following sub-directories.</p></li><li><p>All configurations uses the mconf-based configuration tool. To change this configuration using that tool, you should:</p><p>a. Build and install the kconfig mconf tool. See nuttx/README.txt and see additional README.txt files in the NuttX tools repository. b. Execute &#39;make menuconfig&#39; in nuttx/ in order to start the reconfiguration process.</p></li><li><p>Before building, make sure that the configuration is correct for your host platform:</p><p>a. Linux, 32-bit CPU:</p><pre><code>    CONFIG_HOST_LINUX=y
    CONFIG_HOST_WINDOWS=n
    CONFIG_HOST_X86=y
    CONFIG_HOST_X86_64=n
    CONFIG_HOST_ARM64=n
</code></pre><p>b. Linux, 64-bit CPU, 32-bit build:</p><pre><code>    CONFIG_HOST_LINUX=y
    CONFIG_HOST_WINDOWS=n
    CONFIG_HOST_X86=n
    CONFIG_HOST_X86_64=y
    CONFIG_HOST_ARM64=n
    CONFIG_SIM_X8664_MICROSOFT=n
    CONFIG_SIM_X8664_SYSTEMV=y
    CONFIG_SIM_M32=y
</code></pre><p>c. Linux, 64-bit CPU, 64-bit build:</p><pre><code>    CONFIG_HOST_LINUX=y
    CONFIG_HOST_WINDOWS=n
    CONFIG_HOST_X86=n
    CONFIG_HOST_X86_64=y
    CONFIG_HOST_ARM64=n
    CONFIG_SIM_X8664_MICROSOFT=n
    CONFIG_SIM_X8664_SYSTEMV=y
    CONFIG_SIM_M32=n
</code></pre><p>d. Cygwin, 32-bit:</p><pre><code>    CONFIG_HOST_LINUX=n
    CONFIG_HOST_WINDOWS=y
    CONFIG_WINDOWS_CYGWIN=y
    CONFIG_HOST_X86=y
    CONFIG_HOST_X86_64=n
    CONFIG_HOST_ARM64=n
</code></pre><p>e. Cygwin64, 64-bit, 32-bit build</p><pre><code>I don\\&#39;t believe this configuration is supported by Cygwin64
</code></pre><p>f. Cygwin64, 64-bit, 64-bit build:</p><pre><code>    CONFIG_HOST_LINUX=n
    CONFIG_HOST_WINDOWS=y
    CONFIG_WINDOWS_CYGWIN=y
    CONFIG_HOST_X86=n
    CONFIG_HOST_X86_64=y
    CONFIG_HOST_ARM64=n
    CONFIG_SIM_X8664_MICROSOFT=y
    CONFIG_SIM_X8664_SYSTEMV=n
    CONFIG_SIM_M32=n
</code></pre><p>g. macOS, 64-bit, 64-bit build:</p><pre><code>    CONFIG_HOST_LINUX=n
    CONFIG_HOST_MACOS=y
    CONFIG_HOST_WINDOWS=n
    CONFIG_HOST_X86=n
    CONFIG_HOST_X86_64=y
    CONFIG_HOST_ARM64=n
    CONFIG_SIM_X8664_MICROSOFT=n
    CONFIG_SIM_X8664_SYSTEMV=y
    CONFIG_SIM_M32=n
</code></pre><p>h. macOS M1, 64-bit, 64-bit build:</p><pre><code>    CONFIG_HOST_LINUX=n
    CONFIG_HOST_MACOS=y
    CONFIG_HOST_WINDOWS=n
    CONFIG_HOST_X86=n
    CONFIG_HOST_X86_64=n
    CONFIG_HOST_ARM64=y
    CONFIG_SIM_X8664_MICROSOFT=n
    CONFIG_SIM_X8664_SYSTEMV=y
    CONFIG_SIM_M32=n
</code></pre><p>i. Linux ARM64, 64-bit, 64-bit build:</p><pre><code>    CONFIG_HOST_LINUX=y
    CONFIG_HOST_MACOS=n
    CONFIG_HOST_WINDOWS=n
    CONFIG_HOST_X86=n
    CONFIG_HOST_X86_64=n
    CONFIG_HOST_ARM64=y
    CONFIG_SIM_X8664_MICROSOFT=n
    CONFIG_SIM_X8664_SYSTEMV=y
    CONFIG_SIM_M32=n
</code></pre></li></ol></blockquote><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="adb" tabindex="-1">adb <a class="header-anchor" href="#adb" aria-label="Permalink to &quot;adb&quot;">​</a></h3><p>A simple demo show how to config adb:</p><pre><code> ./nuttx
NuttShell (NSH) NuttX-10.2.0
nsh&gt; adbd &amp;
adbd [2:100]
</code></pre><p>You can use the normal adb command from host:</p><pre><code>adb kill-server
adb connect localhost:5555
adb shell
</code></pre><h3 id="alsa" tabindex="-1">alsa <a class="header-anchor" href="#alsa" aria-label="Permalink to &quot;alsa&quot;">​</a></h3><p>This configuration enables testing audio applications on NuttX by implementing an audio-like driver that uses ALSA to forward the audio to the host system. It also enables the [hostfs]{.title-ref} to enable direct access to the host system&#39;s files mounted on the simulator. The ALSA audio driver allows uncompressed PCM files - as well as MP3 files - to be played.</p><p>To check the audio devices:</p><pre><code> ./nuttx
NuttShell (NSH) NuttX-10.4.0
nsh&gt; ls /dev/audio
/dev/audio:
pcm0c
pcm0p
pcm1c
pcm1p
</code></pre><ul><li>[pcm0c]{.title-ref} represents the device to capture uncompressed PCM audio;</li><li>[pcm0p]{.title-ref} represents the device to playback uncompressed PCM files;</li><li>[pcm1c]{.title-ref} represents the device to capture MP3-encoded audio;</li><li>[pcm1p]{.title-ref} represents the device to playback MP3-encoded files;</li></ul><h4 id="mounting-files-from-host-system" tabindex="-1">Mounting Files from Host System <a class="header-anchor" href="#mounting-files-from-host-system" aria-label="Permalink to &quot;Mounting Files from Host System&quot;">​</a></h4><p>To mount files from the host system and enable them to be played in the sim:</p><pre><code>nsh&gt; mount -t hostfs -o fs=/path/to/audio/files/ /host
nsh&gt; ls /host
/host:
mother.mp3
mother.wav
.
..
</code></pre><h4 id="playing-uncompressed-pcm-files" tabindex="-1">Playing uncompressed-PCM files <a class="header-anchor" href="#playing-uncompressed-pcm-files" aria-label="Permalink to &quot;Playing uncompressed-PCM files&quot;">​</a></h4><p>To play uncompressed-PCM files, we can use [nxplayer]{.title-ref}&#39;s [playraw]{.title-ref} command. We need 1) select the appropriate audio device to playback this file and 1) know in advance the file&#39;s parameters (channels, bits/sample and sampling rate):</p><pre><code>nsh&gt; nxplayer
NxPlayer version 1.05
h for commands, q to exit

nxplayer&gt; device /dev/audio/pcm0p
nxplayer&gt; playraw /host/mother.wav 2 16 44100
</code></pre><p>In this example, the file [mother.wav]{.title-ref} is a stereo (2-channel), 16 bits/sample and 44,1KHz PCM-encoded file.</p><h4 id="playing-mp3-encoded-files" tabindex="-1">Playing MP3-encoded files <a class="header-anchor" href="#playing-mp3-encoded-files" aria-label="Permalink to &quot;Playing MP3-encoded files&quot;">​</a></h4><p>To play MP3 files, we can use [nxplayer]{.title-ref}&#39;s [play]{.title-ref} command directly. We only need to select the appropriate audio device to playback this file:</p><pre><code>nsh&gt; nxplayer
NxPlayer version 1.05
h for commands, q to exit

nxplayer&gt; device /dev/audio/pcm1p
nxplayer&gt; play /host/mother.mp3
</code></pre><h3 id="bluetooth" tabindex="-1">bluetooth <a class="header-anchor" href="#bluetooth" aria-label="Permalink to &quot;bluetooth&quot;">​</a></h3><p>Supports some very limited, primitive, low-level debug of the Bluetooth stack using the Bluetooth &quot;Swiss Army Knife&quot; at apps/wireless/bluetooth/btsak and the NULL Bluetooth device at drivers/wireless/bluetooth/bt_null.c</p><p>There is also support on a Linux Host for attaching the bluetooth hardware from the host to the NuttX bluetooth stack via the HCI Socket interface over the User Channel. This is enabled in the bthcisock configuration. In order to use this you must give the nuttx elf additional capabilities:</p><pre><code>sudo setcap &#39;cap_net_raw,cap_net_admin=eip&#39; ./nuttx
</code></pre><p>You can then monitor the HCI traffic on the host with wireshark or btmon:</p><pre><code>sudo btmon
</code></pre><h3 id="configdata" tabindex="-1">configdata <a class="header-anchor" href="#configdata" aria-label="Permalink to &quot;configdata&quot;">​</a></h3><p>A unit test for the MTD configuration data driver.</p><h3 id="cxxtest" tabindex="-1">cxxtest <a class="header-anchor" href="#cxxtest" aria-label="Permalink to &quot;cxxtest&quot;">​</a></h3><p>The C++ standard library test at apps/testing/cxxtest configuration. This test is used to verify the uClibc++ port to NuttX.</p><p>NOTES</p><blockquote><ol><li><p>Before you can use this example, you must first install the uClibc++ C++ library. This is located outside of the NuttX source tree in the NuttX uClibc++ GIT repository. See the README.txt file there for instructions on how to install uClibc++</p></li><li><p>At present (2012/11/02), exceptions are disabled in this example (CONFIG_CXX_EXCEPTION=n). It is probably not necessary to disable exceptions.</p></li><li><p>Unfortunately, this example will not run now.</p><p>The reason that the example will not run on the simulator has to do with when static constructors are enabled: In the simulator it will attempt to execute the static constructors before main() starts. BUT... NuttX is not initialized and this results in a crash.</p><p>To really use this example, I will have to think of some way to postpone running C++ static initializers until NuttX has been initialized.</p></li></ol></blockquote><h3 id="fb" tabindex="-1">fb <a class="header-anchor" href="#fb" aria-label="Permalink to &quot;fb&quot;">​</a></h3><p>A simple configuration used for some basic (non-graphic) debug of the framebuffer character drivers using apps/examples/fb.</p><h3 id="ipforward" tabindex="-1">ipforward <a class="header-anchor" href="#ipforward" aria-label="Permalink to &quot;ipforward&quot;">​</a></h3><p>This is an NSH configuration that includes a simple test of the NuttX IP forwarding logic using apps/examples/ipforward. That example uses two TUN network devices to represent two networks. The test then sends packets from one network destined for the other network. The NuttX IP forwarding logic will recognize that the received packets are not destined for it and will forward the logic to the other TUN network. The application logic then both sends the packets on one network and receives and verifies the forwarded packet received on the other network. The received packets differ from the sent packets only in that the hop limit (TTL) has been decremented.</p><p>Be default, this test will forward TCP packets. The test can be modified to support forwarding of ICMPv6 multicast packets with these changes to the .config file:</p><pre><code>-CONFIG_EXAMPLES_IPFORWARD_TCP=y
+CONFIG_EXAMPLES_IPFORWARD_ICMPv6=y

+CONFIG_NET_ICMPv6=y
+CONFIG_NET_ICMPv6_SOCKET=y
+CONFIG_NET_ETHERNET=y
+CONFIG_NET_IPFORWARD_BROADCAST=y
</code></pre><p>Additional required settings will also be selected when you manually select the above via &#39;make menuconfig&#39;.</p><h3 id="loadable" tabindex="-1">loadable <a class="header-anchor" href="#loadable" aria-label="Permalink to &quot;loadable&quot;">​</a></h3><p>This configuration provides an example of loadable apps. It cannot be used with any Windows configuration, however, because Windows does not use the ELF format.</p><p>This is the key part of the configuration:</p><pre><code>+CONFIG_PATH_INITIAL=&quot;/system/bin&quot;
+CONFIG_INIT_FILEPATH=&quot;/system/bin/nsh&quot;
</code></pre><p>The shell is loaded from the elf, but you can also run any of the ELFs that are in /system/bin as they are on the &quot;PATH&quot;</p><h3 id="minibasic" tabindex="-1">minibasic <a class="header-anchor" href="#minibasic" aria-label="Permalink to &quot;minibasic&quot;">​</a></h3><p>This configuration was used to test the Mini Basic port at apps/interpreters/minibasic.</p><h3 id="module" tabindex="-1">module <a class="header-anchor" href="#module" aria-label="Permalink to &quot;module&quot;">​</a></h3><p>This is a configuration to test CONFIG_LIBC_ELF with 64-bit modules. This has apps/examples/module enabled. This configuration is intended for 64-bit host OS.</p><h3 id="module32" tabindex="-1">module32 <a class="header-anchor" href="#module32" aria-label="Permalink to &quot;module32&quot;">​</a></h3><p>This is a configuration to test CONFIG_LIBC_ELF with CONFIG_SIM_M32 and 32-bit modules. This has apps/examples/module enabled. This configuration is intended for 64-bit host OS.</p><h3 id="mount" tabindex="-1">mount <a class="header-anchor" href="#mount" aria-label="Permalink to &quot;mount&quot;">​</a></h3><p>Configures to use apps/examples/mount.</p><h3 id="mtdpart" tabindex="-1">mtdpart <a class="header-anchor" href="#mtdpart" aria-label="Permalink to &quot;mtdpart&quot;">​</a></h3><p>This is the apps/examples/mtdpart test using a MTD RAM driver to simulate the FLASH part.</p><h3 id="mtdrwb" tabindex="-1">mtdrwb <a class="header-anchor" href="#mtdrwb" aria-label="Permalink to &quot;mtdrwb&quot;">​</a></h3><p>This is the apps/examples/mtdrwb test using a MTD RAM driver to simulate the FLASH part.</p><h3 id="nettest" tabindex="-1">nettest <a class="header-anchor" href="#nettest" aria-label="Permalink to &quot;nettest&quot;">​</a></h3><p>Configures to use apps/examples/nettest. This configuration enables networking using the network TAP device.</p><p>NOTES:</p><blockquote><ol><li><p>The NuttX network is not, however, functional on the Linux TAP device yet.</p><p>UPDATE: The TAP device does apparently work according to a NuttX user (provided that it is not used with NSH: NSH waits on readline() for console input. When it calls readline(), the whole system blocks waiting from input from the host OS). My failure to get the TAP device working appears to have been a cockpit error.</p></li><li><p>As of NuttX-5.18, when built on Windows, this test does not try to use the TAP device (which is not available on Cygwin anyway), but inside will try to use the Cygwin WPCAP library. Only the most preliminary testing has been performed with the Cygwin WPCAP library, however.</p><p>NOTE that the IP address is hard-coded in arch/sim/src/up_wpcap.c. You will either need to edit your configuration files to use 10.0.0.1 on the &quot;target&quot; (<a href="./.html">CONFIG_EXAMPLES_NETTEST</a>*) or edit up_wpcap.c to select the IP address that you want to use.</p></li></ol></blockquote><h3 id="nimble" tabindex="-1">nimble <a class="header-anchor" href="#nimble" aria-label="Permalink to &quot;nimble&quot;">​</a></h3><p>This is similar to bthcisock configuration, which uses the exposes the real BLE stack to NuttX, but disables NuttX&#39;s own BLE stack and uses nimBLE stack instead (built in userspace).</p><p>This configuration can be tested by running nimBLE example application &quot;nimble&quot; as follows:</p><pre><code> sudo setcap &#39;cap_net_raw,cap_net_admin=eip&#39; nuttx
 ./nuttx
NuttShell (NSH) NuttX-9.1.0
nsh&gt; ifup bnep0
ifup bnep0...OK
nsh&gt; nimble
hci init
port init
gap init
gatt init
ans init
ias init
lls init
tps init
hci_sock task init
ble_host task init
hci sock task
host task
advertise
</code></pre><p>At this point you should be able to detect a &quot;nimble&quot; BLE device when scanning for BLE devices. You can use nRFConnect Android application from Nordic to connect and inspect exposed GATT services.</p><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Configures to use the NuttShell at apps/examples/nsh.</p><p>NOTES:</p><blockquote><ol><li><p>This version has one builtin function: This configuration:</p><pre><code>apps/examples/hello.
</code></pre></li><li><p>This configuration has BINFS enabled so that the builtin applications can be made visible in the file system. Because of that, the builtin applications do not work as other examples.</p><p>The binfs filesystem will be mounted at /bin when the system starts up:</p><pre><code>nsh&gt; ls /bin
/bin:
  hello
nsh&gt; echo PATH
/bin
nsh&gt; hello
Hello, World!!
nsh&gt;
</code></pre><p>Notice that the executable &#39;hello&#39; is found using the value in the PATH variable (which was preset to &quot;/bin&quot;). If the PATH variable were not set then you would have to use /bin/hello on the command line.</p></li></ol></blockquote><h3 id="nsh2" tabindex="-1">nsh2 <a class="header-anchor" href="#nsh2" aria-label="Permalink to &quot;nsh2&quot;">​</a></h3><p>This is another example that configures to use the NuttShell at apps/examples/nsh. Like nsh, this version uses NSH built-in functions: The nx, nxhello, and nxlines examples are included as built-in functions.</p><p>NOTES:</p><blockquote><ol><li><p>X11 Configuration</p><p>This configuration uses an X11-based framebuffer driver. Of course, this configuration can only be used in environments that support X11! (And it may not even be usable in all of those environments without some &quot;tweaking&quot; See discussion below under the nx11 configuration).</p><p>For examples, it expects to be able to include X11/Xlib.h. That currently fails on my Linux box.</p></li></ol></blockquote><h3 id="nx" tabindex="-1">nx <a class="header-anchor" href="#nx" aria-label="Permalink to &quot;nx&quot;">​</a></h3><p>Configures to use apps/examples/nx.</p><p>NOTES:</p><blockquote><ol><li><p>Special Framebuffer Configuration</p><p>Special simulated framebuffer configuration options:</p><pre><code>CONFIG_SIM_FBHEIGHT - Height of the framebuffer in pixels
CONFIG_SIM_FBWIDTH  - Width of the framebuffer in pixels.
CONFIG_SIM_FBBPP    - Pixel depth in bits
</code></pre></li><li><p>No Display!</p><p>This version has NO DISPLAY and is only useful for debugging NX internals in environments where X11 is not supported. There is an additional configuration that may be added to include an X11-based simulated framebuffer driver:</p><pre><code>CONFIG_SIM_X11FB    - Use X11 window for framebuffer
</code></pre><p>See the &quot;nx11&quot; configuration below for more information.</p></li></ol></blockquote><h3 id="nx11" tabindex="-1">nx11 <a class="header-anchor" href="#nx11" aria-label="Permalink to &quot;nx11&quot;">​</a></h3><p>Configures to use apps/examples/nx. This configuration is similar to the nx configuration except that it adds support for an X11-based framebuffer driver. Of course, this configuration can only be used in environments that support X11! (And it may not even be usable in all of those environments without some &quot;tweaking&quot;).</p><blockquote><ol><li><p>Special Framebuffer Configuration</p><p>This configuration uses the same special simulated framebuffer configuration options as the nx configuration:</p><pre><code>CONFIG_SIM_X11FB    - Use X11 window for framebuffer
CONFIG_SIM_FBHEIGHT - Height of the framebuffer in pixels
CONFIG_SIM_FBWIDTH  - Width of the framebuffer in pixels.
CONFIG_SIM_FBBPP    - Pixel depth in bits
</code></pre></li><li><p>X11 Configuration</p><p>But now, since CONFIG_SIM_X11FB is also selected the following definitions are needed:</p><pre><code>CONFIG_SIM_FBBPP (must match the resolution of the display).
CONFIG_FB_CMAP=y
</code></pre><p>My system has 24-bit color, but packed into 32-bit words so the correct setting of CONFIG_SIM_FBBPP is 32.</p><p>For whatever value of CONFIG_SIM_FBBPP is selected, the corresponding <a href="./.html">CONFIG_NX_DISABLE</a>*BPP setting must not be disabled.</p></li><li><p>Touchscreen Support</p><p>A X11 mouse-based touchscreen simulation can also be enabled by setting:</p><pre><code>CONFIG_INPUT=y
CONFIG_SIM_TOUCHSCREEN=y
</code></pre><p>NOTES:</p><p>a. If you do not have the call to sim_tcinitialize(0), the build will mysteriously fail claiming that it can&#39;t find up_tcenter() and up_tcleave(). That is a consequence of the crazy way that the simulation is built and can only be eliminated by calling up_simtouchscreen(0) from your application. b. You must first call up_fbinitialize(0) before calling up_simtouchscreen() or you will get a crash. c. Call sim_tcunininitializee() when you are finished with the simulated touchscreen. d. Enable CONFIG_DEBUG_INPUT=y for touchscreen debug output.</p></li><li><p>X11 Build Issues</p><p>To get the system to compile under various X11 installations you may have to modify a few things. For example, in order to find libXext, I had to make the following change under Ubuntu 9.09:</p><pre><code>cd /usr/lib/
sudo ln -s libXext.so.6.4.0 libXext.so
</code></pre></li><li><p>apps/examples/nxterm</p><p>This configuration is also set up to use the apps/examples/nxterm test instead of apps/examples/nx. To enable this configuration, First, select Multi-User mode as described above. Then, add the following definitions to the defconfig file:</p><pre><code>-CONFIG_NXTERM=n
+CONFIG_NXTERM=y

-CONFIG_EXAMPLES_NX=y
+CONFIG_EXAMPLES_NX=n

-CONFIG_EXAMPLES_NXTERM=n
+CONFIG_EXAMPLES_NXTERM=y
</code></pre><p>See apps/examples/README.txt for further details.</p></li></ol></blockquote><h3 id="nxffs" tabindex="-1">nxffs <a class="header-anchor" href="#nxffs" aria-label="Permalink to &quot;nxffs&quot;">​</a></h3><p>This is a test of the NXFFS file system using the apps/testing/nxffs test with an MTD RAM driver to simulate the FLASH part.</p><h3 id="nxlines" tabindex="-1">nxlines <a class="header-anchor" href="#nxlines" aria-label="Permalink to &quot;nxlines&quot;">​</a></h3><p>This is the apps/examples/nxlines test.</p><h3 id="nxwm" tabindex="-1">nxwm <a class="header-anchor" href="#nxwm" aria-label="Permalink to &quot;nxwm&quot;">​</a></h3><p>This is a special configuration setup for the NxWM window manager UnitTest. The NxWM window manager can be found here:</p><pre><code>apps/graphics/NxWidgets/nxwm
</code></pre><p>The NxWM unit test can be found at:</p><pre><code>apps/graphics/NxWidgets/UnitTests/nxwm
</code></pre><p>NOTES</p><blockquote><ol><li><p>There is an issue with running this example under the simulation: In the default configuration, this example will run the NxTerm example which waits on readline() for console input. When it calls readline(), the whole system blocks waiting from input from the host OS. So, in order to get this example to run, you must comment out the readline() call in apps/nshlib/nsh_consolemain.c like:</p><pre><code>Index: nsh_consolemain.c
===================================================================
--- nsh_consolemain.c   (revision 4681)
+++ nsh_consolemain.c   (working copy)
@@ -117,7 +117,8 @@
   /* Execute the startup script */

 #ifdef CONFIG_ETC_ROMFS
-  nsh_script(&amp;pstate-&gt;cn_vtbl, &quot;init&quot;, NSH_INITPATH);
+// REMOVE ME
+//  nsh_script(&amp;pstate-&gt;cn_vtbl, &quot;init&quot;, NSH_INITPATH);
 #endif

   /* Then enter the command line parsing loop */
@@ -130,7 +131,8 @@
       fflush(pstate-&gt;cn_outstream);

       /* Get the next line of input */
-
+sleep(2); // REMOVE ME
+#if 0 // REMOVE ME
       ret = readline(pstate-&gt;cn_line, LINE_MAX,
                      INSTREAM(pstate), OUTSTREAM(pstate));
       if (ret &gt; 0)
@@ -153,6 +155,7 @@
                   &quot;readline&quot;, NSH_ERRNO_OF(-ret));
           nsh_exit(&amp;pstate-&gt;cn_vtbl, 1);
         }
+#endif // REMOVE ME
     }

   /* Clean up */
</code></pre><p>UPDATE: I recently implemented a good UART simulation to drive the serial console. So I do not believe that problem exists and I think that the above workaround should no longer be necessary. However, I will leave the above text in place until I get the opportunity to verify that the new UART simulation fixes the problem.</p></li></ol><p>2019-05-04: Something has changed. Today this configuration failed to</p><p>: build because is requires CONFIG_NX_XYINPUT=y in the configuration. That indicates mouse or touchscreen support. Apparently, the current NxWM will not build without this support.</p></blockquote><h3 id="ostest" tabindex="-1">ostest <a class="header-anchor" href="#ostest" aria-label="Permalink to &quot;ostest&quot;">​</a></h3><p>The &quot;standard&quot; NuttX apps/examples/ostest configuration.</p><h3 id="pf-ieee802154" tabindex="-1">pf_ieee802154 <a class="header-anchor" href="#pf-ieee802154" aria-label="Permalink to &quot;pf\\_ieee802154&quot;">​</a></h3><p>This is the configuration that used for unit level test of the socket support for the PF_IEEE802154 address family. It uses the IEEE 802.15.4 loopback network driver and the test at apps/examples/pf_ieee802154.</p><p>Basic usage example:</p><pre><code>nsh&gt; pfserver ab:cd &amp;
nsh&gt; pfclient ab:cd
</code></pre><h3 id="pktradio" tabindex="-1">pktradio <a class="header-anchor" href="#pktradio" aria-label="Permalink to &quot;pktradio&quot;">​</a></h3><p>This configuration is identical to the &#39;sixlowpan configuration described below EXCEPT that it uses the generic packet radio loopback network device.</p><h3 id="rpproxy-and-rpserver" tabindex="-1">rpproxy and rpserver <a class="header-anchor" href="#rpproxy-and-rpserver" aria-label="Permalink to &quot;rpproxy and rpserver&quot;">​</a></h3><blockquote><p>This is an example implementation for OpenAMP based on the share memory.</p><p>rpproxy: Remote slave(client) proxy process.</p><p>: rpproxy created a proxy between client and server to allow the client to access the hardware resources on different process.</p><p>rpserver: Remote master(host) server process.</p><p>:</p><pre><code>rpserver contains all the real hardware configuration, such as:

:   1.  Universal Asynchronous Receiver/Transmitter (UART).
    2.  Specific File System.
    3.  Network protocol stack and real network card device.
    4.  \\...
</code></pre></blockquote><p>Rpmsg driver used in this example include:</p><ol><li><p>Rpmsg Syslog</p><blockquote><p>Source:</p><pre><code>include/nuttx/syslog/syslog_rpmsg.h
drivers/syslog/syslog_rpmsg_server.c
drivers/syslog/syslog_rpmsg.c
</code></pre><p>Describe:</p><pre><code>1&gt;Redirect log to master core
  Linux kernel, NuttX, Freertos ...
2&gt;Work as early as possible
  Two phase initialization
3&gt;Never lost the log
  Hang during boot or runtime
  Full system crash(panic, watchdog ...)
</code></pre></blockquote></li><li><p>Rpmsg TTY(UART)</p><blockquote><p>Source:</p><pre><code>include/nuttx/serial/uart_rpmsg.h
drivers/serial/uart_rpmsg.c
</code></pre><p>Describe:</p><pre><code>1&gt;Like pseudo terminal but between two CPU
2&gt;No different from real tty(open/read/write/close)
3&gt;Full duplex communication
4&gt;Support multiple channels as need
  1)Connect RTOS shell
  2)Make integrated GPS like external(NMEA)
  3)Make integrated modem like external(ATCMD)
</code></pre></blockquote></li><li><p>RpmsgFS</p><blockquote><p>Source:</p><pre><code>fs/rpmsgfs/rpmsgfs.h
fs/rpmsgfs/rpmsgfs.c
fs/rpmsgfs/rpmsgfs_client.c
fs/rpmsgfs/rpmsgfs_server.c
</code></pre><p>Describe:</p><pre><code>1.Like NFS but between two CPU
2.Fully access remote(Linux/NuttX) File system
  1)Save the tuning parameter during manufacture
  2)Load the tuning parameter file in production
  3)Save audio dump to file for tuning/debugging
  4)Dynamic loading module from remote
</code></pre></blockquote></li><li><p>Rpmsg Net</p><blockquote><p>Source:</p><pre><code>include/nuttx/net/rpmsg.h
include/nuttx/net/rpmsgdrv.h
drivers/net/rpmsgdrv.c
drivers/usrsock/usrsock_rpmsg.h
drivers/usrsock/usrsock_rpmsg.c
drivers/usrsock/usrsock_rpmsg_server.c
</code></pre><p>Describe:</p><pre><code>1)Rpmsg UsrSock client
2)Rpmsg UsrSock server
3)Rpmsg Net driver
4)Rpmsg MAC/PHY adapter
</code></pre></blockquote></li></ol><p>To use this example:</p><ol><li><p>Build images</p><blockquote><ol><li><p>Build rpserver and backup the image:</p><pre><code>./tools/configure.sh sim:rpserver
make
cp nuttx ~/rpserver
</code></pre></li><li><p>Distclean the build environment:</p><pre><code>make distclean
</code></pre></li><li><p>Build rpproxy:</p><pre><code>./tools/configure.sh sim:rpproxy
make
cp nuttx ~/rpproxy
</code></pre></li></ol></blockquote></li><li><p>Test the Rpmsg driver</p><blockquote><ol><li>Rpmsg Syslog:</li></ol><blockquote><p>Start rpserver:</p><pre><code> sudo ~/rpserver
[    0.000000] server: SIM: Initializing

NuttShell (NSH)
server&gt;

Start rpproxy:

 sudo ~/rpproxy

Check the syslog from rpproxy in rpserver terminal:

server&gt; [    0.000000] proxy: SIM: Initializing
</code></pre></blockquote><ol start="2"><li>Rpmsg TTY(UART):</li></ol><blockquote><p>Use cu switch the current CONSOLE to the proxy:</p><pre><code>server&gt; ps
  PID GROUP PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK   STACK COMMAND
    0     0   0 FIFO     Kthread N-- Ready              00000000 000000 Idle Task
    1     1 224 FIFO     Kthread --- Waiting  Signal    00000000 002032 hpwork
    2     1 100 FIFO     Task    --- Running            00000000 004080 init
    3     3 224 FIFO     Kthread --- Waiting  Signal    00000002 002000 rptun proxy 0x56634fa0
server&gt; cu /dev/ttyproxy
proxy&gt; ps
  PID GROUP PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK   STACK COMMAND
    0     0   0 FIFO     Kthread N-- Ready              00000000 000000 Idle Task
    1     1 224 FIFO     Kthread --- Waiting  Signal    00000000 002032 hpwork
    3     3 100 FIFO     Task    --- Running            00000000 004080 init
</code></pre><p>To switch back the console, type <code>&quot;~.&quot;</code> in the cu session.</p></blockquote></blockquote></li><li><p>RpmsgFS:</p><p>Mount the remote file system via RPMSGFS, cu to proxy first:</p><pre><code>server&gt; cu
proxy&gt; mount -t rpmsgfs -o cpu=server,fs=/proc proc_server
proxy&gt; ls
/:
  dev/
  etc/
  proc/
  proc_server/
  tmp/
</code></pre><p>Check the uptime:</p><pre><code>proxy&gt; cat proc/uptime
  833.21
proxy&gt; cat proc_server/uptime
  821.72
</code></pre></li><li><p>Rpmsg UsrSock:</p><p>&quot;rptun proxy&quot; kernel thread is running:</p><pre><code>server&gt; ps
  PID GROUP PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK   STACK COMMAND
    0     0   0 FIFO     Kthread N-- Ready              00000000 000000 Idle Task
    1     1 224 FIFO     Kthread --- Waiting  Signal    00000000 002032 hpwork
    2     1 100 FIFO     Task    --- Running            00000000 004080 init
    3     3 224 FIFO     Kthread --- Waiting  Signal    00000002 002000 rptun proxy 0x56634fa0

send ICMP ping to network server via rpmsg usrsock:

server&gt; cu
proxy&gt; ping 127.0.0.1
PING 127.0.0.1 56 bytes of data
56 bytes from 127.0.0.1: icmp_seq=0 time=20 ms
56 bytes from 127.0.0.1: icmp_seq=1 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=2 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=3 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=4 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=5 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=6 time=20 ms
56 bytes from 127.0.0.1: icmp_seq=7 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=8 time=10 ms
56 bytes from 127.0.0.1: icmp_seq=9 time=10 ms
10 packets transmitted, 10 received, 0% packet loss, time 10100 ms
</code></pre></li></ol><p>Please read NETWORK-LINUX.txt if you want to try the real address.</p><h3 id="sixlowpan" tabindex="-1">sixlowpan <a class="header-anchor" href="#sixlowpan" aria-label="Permalink to &quot;sixlowpan&quot;">​</a></h3><p>This configuration was intended only for unit-level testing of the 6LoWPAN stack. It enables networking with 6LoWPAN support and uses only a IEEE802.15.4 MAC loopback network device to supported testing.</p><p>This configuration includes apps/examples/nettest and apps/examples/udpblaster. Neither are truly functional. The only intent of this configuration is to verify that the 6LoWPAN stack correctly encodes IEEE802.15.4 packets on output to the loopback device and correctly decodes the returned packet.</p><p>See also the &#39;pktradio&#39; configuration.</p><h3 id="rtptools" tabindex="-1">rtptools <a class="header-anchor" href="#rtptools" aria-label="Permalink to &quot;rtptools&quot;">​</a></h3><p><strong>RTP Tools</strong> is a set of small applications that can be used for processing RTP data.</p><ul><li><code>rtpplay</code>: playback RTP sessions recorded by <code>rtpdump</code></li><li><code>rtpsend</code>: generate RTP packets from the textual description, generated by hand or <code>rtpdump</code></li><li><code>rtpdump</code>: parse and print RTP packets, generating output files suitable for <code>rtpplay</code> and <code>rtpsend</code></li><li><code>rtptrans</code>: RTP translator between unicast and multicast networks</li></ul><p>This configuration is based on the <code>sim:tcpblaster &lt;simulator_accessing_the_network&gt;</code>{.interpreted-text role=&quot;ref&quot;} and builds the <code>rtpdump</code>. This application is able to receive RTP packets and print the contents. As a real-world application, one could write the received content to a FIFO and play it with <code>nxplayer</code>.</p><p>To build it, follow the instructions for <code>Accessing the Network &lt;simulator_accessing_the_network&gt;</code>{.interpreted-text role=&quot;ref&quot;}.</p><p>Tip</p><p>One can use <code>pulseaudio</code> to send RTP packets through the network:</p><p>pactl load-module module-null-sink sink_name=rtp format=s16le channels=2 rate=44100 sink_properties=&quot;device.description=&#39;RTP&#39;&quot; pactl load-module module-rtp-send source=rtp.monitor format=s16le destination_ip=10.0.1.2 port=46998</p><p>The loaded sink <code>RTP</code> is used to send PC&#39;s audio to the <code>10.0.1.2:46998</code> address (SIM&#39;s IP).</p><p>After being able to access the network through the simulator, run:</p><pre><code>nsh&gt; rtpdump -F short /46998 &amp;
rtpdump [5:100]
nsh&gt; 42949704.930000 1277462397 15308
42949704.930000 1277462714 15309
</code></pre><p>For a real-world application, check <code>RTP Tools on ESP32-LyraT board &lt;esp32-lyrat_rtptools&gt;</code>{.interpreted-text role=&quot;ref&quot;}.</p><h3 id="spiffs" tabindex="-1">spiffs <a class="header-anchor" href="#spiffs" aria-label="Permalink to &quot;spiffs&quot;">​</a></h3><p>This is a test of the SPIFFS file system using the apps/testing/fstest test with an MTD RAM driver to simulate the FLASH part.</p><h3 id="sotest" tabindex="-1">sotest <a class="header-anchor" href="#sotest" aria-label="Permalink to &quot;sotest&quot;">​</a></h3><p>This is a configuration to test CONFIG_LIBC_ELF with 64-bit modules. This has apps/examples/sotest enabled. This configuration is intended for 64-bit host OS.</p><h3 id="sotest32" tabindex="-1">sotest32 <a class="header-anchor" href="#sotest32" aria-label="Permalink to &quot;sotest32&quot;">​</a></h3><p>This is a configuration to test CONFIG_LIBC_ELF with CONFIG_SIM_M32 and 32-bit modules. This has apps/examples/sotest enabled. This configuration is intended for 64-bit host OS.</p><h3 id="sqlite" tabindex="-1">sqlite <a class="header-anchor" href="#sqlite" aria-label="Permalink to &quot;sqlite&quot;">​</a></h3><p>This configuration is used to test sqlite. Since hostfs does not support FIOC_FILEPATH, it cannot currently be used in hostfs.</p><p>Basic usage example:</p><pre><code>nsh&gt; cd tmp
nsh&gt; sqlite3 test.db
SQLite version 3.45.1 2024-01-30 16:01:20
Enter &quot;.help&quot; for usage hints.
sqlite&gt;
CREATE TABLE COMPANY(
  ID INT PRIMARY KEY     sqlite&gt; (x1...&gt; NOT NULL,
  NAME           TEXT    NOT NULL,
  AGE            (x1...&gt; (x1...&gt; INT     NOT NULL,
  ADDRESS        CHAR(50),
  SALARY         (x1...&gt; (x1...&gt; REAL
);(x1...&gt;
sqlite&gt; .quit
sqlite&gt;
nsh&gt;
nsh&gt; ls -l
/tmp:
-rwxrwxrwx       12288 test.db
</code></pre><h3 id="tcploop" tabindex="-1">tcploop <a class="header-anchor" href="#tcploop" aria-label="Permalink to &quot;tcploop&quot;">​</a></h3><p>This configuration performs a TCP &quot;performance&quot; test using apps/examples/tcpblaster and the IPv6 local loopback device. Performance is in quotes because, while that is the intent of the tcpblaster example, this is not an appropriate configuration for TCP performance testing. Rather, this configurat is useful only for verifying TCP transfers over the loopback device.</p><p>To use IPv4, modify these settings in the defconfig file:</p><pre><code>-# CONFIG_NET_IPv4 is not set
-CONFIG_NET_IPv6=y
-CONFIG_NET_IPv6_NCONF_ENTRIES=4
</code></pre><h3 id="touchscreen" tabindex="-1">touchscreen <a class="header-anchor" href="#touchscreen" aria-label="Permalink to &quot;touchscreen&quot;">​</a></h3><p>This configuration uses the simple touchscreen test at apps/examples/touchscreen. This test will create an empty X11 window and will print the touchscreen output as it is received from the simulated touchscreen driver.</p><p>Since this example uses the simulated frame buffer driver, most of the configuration settings discussed for the &quot;nx11&quot; configuration also apply here. See that discussion above.</p><p>See apps/examples/README.txt for further information about build requirements and configuration settings.</p><h3 id="toywasm" tabindex="-1">toywasm <a class="header-anchor" href="#toywasm" aria-label="Permalink to &quot;toywasm&quot;">​</a></h3><p>This is a configuration with toywasm.</p><p>An example usage:</p><pre><code>NuttShell (NSH) NuttX-10.4.0
nsh&gt; mount -t hostfs -o fs=/tmp/wasm /mnt
nsh&gt; toywasm --wasi /mnt/hello.wasm
hello
nsh&gt;
</code></pre><h3 id="udgram" tabindex="-1">udgram <a class="header-anchor" href="#udgram" aria-label="Permalink to &quot;udgram&quot;">​</a></h3><p>This is the same as the nsh configuration except that it includes two additional built in applications: server and client. These applications are provided by the test at apps/examples/udgram. This configuration enables local, Unix domain sockets and supports the test of the datagram sockets.</p><p>To use the test:</p><blockquote><p>nsh&gt; server &amp; nsh&gt; client</p></blockquote><h3 id="unionfs" tabindex="-1">unionfs <a class="header-anchor" href="#unionfs" aria-label="Permalink to &quot;unionfs&quot;">​</a></h3><p>This is a version of NSH dedicated to performing the simple test of the Union File System at apps/examples/unionfs. The command &#39;unionfs&#39; will mount the Union File System at /mnt/unionfs. You can than compare what you see at /mnt/unionfs with the content of the ROMFS file systems at apps/examples/unionfs/atestdir and btestdir.</p><p>Here is some sample output from the test:</p><pre><code>NuttShell (NSH)
nsh&gt; unionfs
Mounting ROMFS file system 1 at target=/mnt/a with source=/dev/ram4
Mounting ROMFS file system 2 at target=/mnt/b with source=/dev/ram5
nsh&gt; ls /mnt/unionfs
/mnt/unionfs:
 .
 afile.txt
 offset/
</code></pre><p>When unionfs was created, file system was joined with an offset called &quot;offset&quot;. Therefore, all of the file system 2 root contents will appear to reside under a directory called offset/ (although there is no directory called offset/ on file system 2). File system 1 on the other hand does have an actual directory called offset/. If we list the contents of the offset/ directory in the unified file system, we see the merged contents of the file system 1 offset/ directory and the file system 2 root directory:</p><pre><code>nsh&gt; cat /mnt/unionfs/afile.txt
This is a file in the root directory on file system 1

nsh&gt; ls /mnt/unionfs/offset
/mnt/unionfs/offset:
 afile.txt
 .
 adir/
 bfile.txt
 bdir/
nsh&gt; cat /mnt/unionfs/offset/afile.txt
This is a file in the offset/ directory on file system 1

nsh&gt; cat /mnt/unionfs/offset/bfile.txt
This is another file in the root directory on file system 2
</code></pre><p>The directory offset/adir exists on file system 1 and the directory adir/ exists on file system 2. You can see that these also overlap:</p><pre><code>nsh&gt; ls /mnt/unionfs/offset/adir
/mnt/unionfs/offset/adir:
 ..
 asubdir/
 adirfile.txt
 bsubdir/
 bdirfile.txt
 .
</code></pre><p>The unified directory listing is showing files from both file systems in their respective offset adir/ subdirectories. The file adirfile.txt exists in both file system 1 and file system 2 but the version in file system 2 is occluded by the version in file system 1. The only way that you can know which you are looking at is by cat&#39;ing the file:</p><pre><code>nsh&gt; cat /mnt/unionfs/offset/adir/adirfile.txt
This is a file in directory offset/adir on file system 1
</code></pre><p>The file on file system 1 has correctly occluded the file with the same name on file system 2. bdirfile.txt, however, only exists on file system 2, so it is not occluded:</p><pre><code>nsh&gt; cat /mnt/unionfs/offset/adir/bdirfile.txt
This is another file in directory adir on file system 2
</code></pre><p>You can see the files in the two file systems before they were unified at apps/examples/unionfs/atestdir and btestdir.</p><h3 id="userfs" tabindex="-1">userfs <a class="header-anchor" href="#userfs" aria-label="Permalink to &quot;userfs&quot;">​</a></h3><blockquote><p>This is another NSH configuration that includes the built-in application of apps/examples/userfs to support test of the UserFS on the simulation platform.</p><p>To use the test:</p><pre><code>nsh&gt; userfs                 # Mounts the UserFS test file system at
                            # /mnt/ufstest
nsh&gt; mount                  # Testing is then performed by exercising the
                            # file system from the command line
nsh&gt; ls -l /mnt/ufstest
nsh&gt; cat /mnt/ufstest/File1
etc.
</code></pre></blockquote><h3 id="ustream" tabindex="-1">ustream <a class="header-anchor" href="#ustream" aria-label="Permalink to &quot;ustream&quot;">​</a></h3><blockquote><p>This is the same as the nsh configuration except that it includes two addition built in applications: server and client. These applications are provided by the test at apps/examples/ustream. This configuration enables local, Unix domain sockets and supports the test of the stream sockets.</p><p>To use the test:</p><pre><code>nsh&gt; server &amp;
nsh&gt; client
</code></pre><p>Note that the binfs file system is mounted at /bin when the system starts up.</p></blockquote><h3 id="vncserver" tabindex="-1">vncserver <a class="header-anchor" href="#vncserver" aria-label="Permalink to &quot;vncserver&quot;">​</a></h3><blockquote><p>This a simple vnc server test configuration, Remmina is tested and recommended since there are some compatibility issues. By default SIM will be blocked at startup to wait client connection, if a client connected, then the fb example will launch.</p></blockquote><h3 id="vpnkit" tabindex="-1">vpnkit <a class="header-anchor" href="#vpnkit" aria-label="Permalink to &quot;vpnkit&quot;">​</a></h3><blockquote><p>This is a configuration with VPNKit support. See NETWORK-VPNKIT.txt.</p></blockquote><h3 id="wamr" tabindex="-1">wamr <a class="header-anchor" href="#wamr" aria-label="Permalink to &quot;wamr&quot;">​</a></h3><p>This is a configuration for WebAssembly sample.</p><ol><li><p>Compile Toolchain</p><ol><li>Download WASI sdk and export the WASI_SDK_PATH path</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-19/wasi-sdk-19.0-linux.tar.gz</span></span>
<span class="line"><span>tar xf wasi-sdk-19.0-linux.tar.gz</span></span>
<span class="line"><span># Put wasi-sdk-19.0 to your host WASI_SDK_PATH environment variable, like:</span></span>
<span class="line"><span>export WASI_SDK_PATH=\`pwd\`/wasi-sdk-19.0</span></span></code></pre></div></blockquote><ol start="2"><li>Download Wamr &quot;wamrc&quot; AOT compiler and export to the PATH</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir wamrc</span></span>
<span class="line"><span>wget https://github.com/bytecodealliance/wasm-micro-runtime/releases/download/WAMR-1.1.2/wamrc-1.1.2-x86_64-ubuntu-20.04.tar.gz</span></span>
<span class="line"><span>tar xf wamrc-1.1.2-x86_64-ubuntu-20.04.tar.gz</span></span>
<span class="line"><span>export PATH=PATH:PWD</span></span></code></pre></div></blockquote></li><li><p>Configuring and running</p><ol><li>Configuring sim/wamr and compile</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./tools/configure.sh  sim/wamr</span></span>
<span class="line"><span>make</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>Wamrc Generate AoT: /home/archer/code/nuttx/n5/apps/wasm/hello.aot</span></span>
<span class="line"><span>Wamrc Generate AoT: /home/archer/code/nuttx/n5/apps/wasm/coremark.aot</span></span>
<span class="line"><span>LD:  nuttx</span></span></code></pre></div></blockquote><ol start="2"><li>Copy the generated wasm file(Interpreter/AoT)</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cp ../apps/wasm/hello.aot .</span></span>
<span class="line"><span>cp ../apps/wasm/hello.wasm .</span></span>
<span class="line"><span>cp ../apps/wasm/coremark.wasm .</span></span></code></pre></div></blockquote><ol start="3"><li>Run iwasm</li></ol><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>./nuttx</span></span>
<span class="line"><span>NuttShell (NSH) NuttX-10.4.0</span></span>
<span class="line"><span>nsh&gt; iwasm /data/hello.wasm</span></span>
<span class="line"><span>Hello, World!!</span></span>
<span class="line"><span>nsh&gt; iwasm /data/hello.aot</span></span>
<span class="line"><span>Hello, World!!</span></span>
<span class="line"><span>nsh&gt; iwasm /data/coremark.wasm</span></span>
<span class="line"><span>2K performance run parameters for coremark.</span></span>
<span class="line"><span>CoreMark Size    : 666</span></span>
<span class="line"><span>Total ticks      : 12000</span></span>
<span class="line"><span>Total time (secs): 12.000000</span></span>
<span class="line"><span>Iterations/Sec   : 5.000000</span></span>
<span class="line"><span>Iterations       : 60</span></span>
<span class="line"><span>Compiler version : Clang 15.0.7</span></span>
<span class="line"><span>Compiler flags   : Using NuttX compilation options</span></span>
<span class="line"><span>Memory location  : Defined by the NuttX configuration</span></span>
<span class="line"><span>seedcrc          : 0xe9f5</span></span>
<span class="line"><span>[0]crclist       : 0xe714</span></span>
<span class="line"><span>[0]crcmatrix     : 0x1fd7</span></span>
<span class="line"><span>[0]crcstate      : 0x8e3a</span></span>
<span class="line"><span>[0]crcfinal      : 0xa14c</span></span>
<span class="line"><span>Correct operation validated. See README.md for run and reporting rules.</span></span>
<span class="line"><span>CoreMark 1.0 : 5.000000 / Clang 15.0.7 Using NuttX compilation options / Defined by the NuttX configuration</span></span></code></pre></div></blockquote></li></ol><h3 id="usbdev" tabindex="-1">usbdev <a class="header-anchor" href="#usbdev" aria-label="Permalink to &quot;usbdev&quot;">​</a></h3><p>This is a configuration with sim usbdev support.</p><ol><li>Raw Gadget setup</li></ol><blockquote><p>Get Raw Gadget: Get Raw Gadget code at <a href="https://github.com/xairy/raw-gadget" target="_blank" rel="noreferrer">https://github.com/xairy/raw-gadget</a>.</p><p>Make Raw Gadget: Run make in the raw_gadget and dummy_hcd directory. If raw_gadget build fail, you need to check which register interface meets your kernel version, usb_gadget_probe_driver or usb_gadget_register_driver.</p><p>Install Raw Gadget: Run ./insmod.sh in the raw_gadget and dummy_hcd directory.</p></blockquote><ol start="2"><li>Configuration</li></ol><blockquote><p>sim:usbdev contains two different sets of composite devices:</p><pre><code>conn0: adb &amp; rndis
conn1: cdcacm &amp; cdcecm
conn2: cdcncm
conn3: cdcmbim
</code></pre><p>You can use the sim:usbdev configuration:</p><pre><code>./tools/configure.sh sim:usbdev
</code></pre></blockquote><ol start="3"><li>How to run</li></ol><blockquote><p>Run nuttx with root mode, then you can use it as the following:</p><pre><code>1&gt; Run ADB:
</code></pre><p>NuttX enter command:</p><pre><code> conn 0
 adbd &amp;
</code></pre><p>Host PC enter the ADB command:</p><pre><code> adb kill-server
 adb devices
List of devices attached
* daemon not running; starting now at tcp:5037
* daemon started successfully
0101        device
</code></pre><p>If ADB connection fails, make sure the udev rule is added correctly. Edit /etc/udev/rules.d/51-android.rules file and add the following to it: SUBSYSTEM==&quot;usb&quot;, ATTR{idVendor}==&quot;1630&quot;, ATTR{idProduct}==&quot;0042&quot;, MODE=&quot;0666&quot;, GROUP=&quot;plugdev&quot;</p><p>Then you can use commands such as adb shell, adb push, adb pull as normal.</p><blockquote><p>2&gt; Run RNDIS:</p></blockquote><p>NuttX enter command:</p><pre><code> conn 0
 ifconfig
eth0    Link encap:Ethernet HWaddr 00:00:00:00:00:00 at UP
        inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
 dhcpd_start eth0
eth0    Link encap:Ethernet HWaddr 00:00:00:00:00:00 at UP
      inet addr:10.0.0.1 DRaddr:10.0.0.1 Mask:255.255.255.0
</code></pre><p>Host PC, you can see the network device named usb0:</p><pre><code> ifconfig
usb0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 602
        inet 10.0.0.4  netmask 255.255.255.0  broadcast 10.0.0.255
        ether 36:50:3d:62:b5:80  txqueuelen 1000  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 43  bytes 8544 (8.5 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
</code></pre><p>Then you can test the network connection using the ping command or telnet.</p><blockquote><p>3&gt; Run CDCACM:</p></blockquote><p>NuttX enter command:</p><pre><code> conn 1
</code></pre><p>If the connection is successful, you can see /dev/ttyACM devices on both NuttX and host PC.</p><p>Then you can use echo and cat command to test:</p><p>NuttX:</p><pre><code>nsh&gt; echo hello &gt; /dev/ttyACM0
</code></pre><p>Host PC:</p><pre><code> cat /dev/ttyACM0
hello

4&gt; Run CDCECM:
</code></pre><p>NuttX enter command:</p><pre><code> conn 1
 ifconfig
eth0    Link encap:Ethernet HWaddr 00:e0:de:ad:be:ef at UP
        inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
 dhcpd_start eth0
 ifconfig
eth0    Link encap:Ethernet HWaddr 00:e0:de:ad:be:ef at UP
        inet addr:10.0.0.1 DRaddr:10.0.0.1 Mask:255.255.255.0
</code></pre><p>Host PC, you can see the network device named enx020000112233:</p><pre><code> ifconfig
enx020000112233: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 576
        inet 10.0.0.4  netmask 255.255.255.0  broadcast 10.0.0.255
        ether 02:00:00:11:22:33  txqueuelen 1000  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 58  bytes 9143 (9.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
</code></pre><p>Then you can test the network connection using the ping command or telnet.</p><blockquote><p>5&gt; Run CDCNCM:</p></blockquote><p>NuttX enter command:</p><pre><code> conn 2
 ifconfig
eth0    Link encap:Ethernet HWaddr 42:67:c6:69:73:51 at UP
        inet addr:10.0.1.2 DRaddr:10.0.1.1 Mask:255.255.255.0
eth1    Link encap:Ethernet HWaddr 00:e0:de:ad:be:ef at UP
        inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
 dhcpd_start eth1
 ifconfig
eth0    Link encap:Ethernet HWaddr 42:67:c6:69:73:51 at UP
        inet addr:10.0.1.2 DRaddr:10.0.1.1 Mask:255.255.255.0
eth1    Link encap:Ethernet HWaddr 00:e0:de:ad:be:ef at UP
        inet addr:10.0.0.1 DRaddr:10.0.0.1 Mask:255.255.255.0
</code></pre><p>Host PC, you can see the network device named enx020000112233:</p><pre><code> ifconfig
enx020000112233: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 576
        inet 10.0.0.2  netmask 255.255.255.0  broadcast 10.0.0.255
        ether 02:00:00:11:22:33  txqueuelen 1000  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 58  bytes 9143 (9.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
</code></pre><p>Then you can test the network connection using the ping command or telnet.</p><blockquote><p>6&gt; Run CDCMBIM:</p></blockquote><p>NuttX enter command:</p><pre><code> conn 3
 ifconfig
eth0    Link encap:Ethernet HWaddr 42:67:c6:69:73:51 at RUNNING mtu 1500
        inet addr:10.0.1.2 DRaddr:10.0.1.1 Mask:255.255.255.0
wwan0   Link encap:UNSPEC at RUNNING mtu 1200
        inet addr:0.0.0.0 DRaddr:0.0.0.0 Mask:0.0.0.0
 ifconfig wwan0 10.0.0.1 netmask 255.255.255.0
 ifconfig
eth0    Link encap:Ethernet HWaddr 42:67:c6:69:73:51 at RUNNING mtu 1500
        inet addr:10.0.1.2 DRaddr:10.0.1.1 Mask:255.255.255.0
wwan0   Link encap:UNSPEC at RUNNING mtu 1200
        inet addr:10.0.0.1 DRaddr:10.0.0.1 Mask:255.255.255.0

 echo -n &quot;hello from nuttx&quot; &gt; /dev/cdc-wdm2
 cat /dev/cdc-wdm2
hello from linux
</code></pre><p>Host PC, you can see the network device named wwx020000112233:</p><pre><code> sudo ifconfig wwx020000112233
 sudo ifconfig wwx020000112233 10.0.0.2 netmask 255.255.255.0
 ifconfig
wwx020000112233: flags=4226&lt;BROADCAST,NOARP,MULTICAST&gt;  mtu 1500
        inet 10.0.0.2  netmask 255.255.255.0  broadcast 10.0.0.255
        ether 02:00:00:11:22:33  txqueuelen 1000  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 58  bytes 9143 (9.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

 sudo cat /dev/cdc-wdm1
hello from nuttx
 sudo bash -c &quot;echo -n hello from linux &gt; /dev/cdc-wdm1&quot;
</code></pre><p>Then you can test the network connection using the ping command or telnet.</p></blockquote><h3 id="usbhost" tabindex="-1">usbhost <a class="header-anchor" href="#usbhost" aria-label="Permalink to &quot;usbhost&quot;">​</a></h3><p>This is a configuration with sim usbhost support.</p><ol><li><p>Libusb1.0 setup:</p><pre><code> sudo apt-get -y install libusb-1.0-0-dev
 sudo apt-get -y install libusb-1.0-0-dev:i386
</code></pre></li><li><p>Configuration</p><p>sim:usbhost support cdcacm.</p><p>You can use the sim:usbdev configuration:</p><pre><code> ./tools/configure.sh sim:usbhost
</code></pre><p>Configure the device you want to connect:</p><pre><code>CONFIG_SIM_USB_PID=0x0042
CONFIG_SIM_USB_VID=0x1630
</code></pre></li><li><p>How to run</p><p>Run sim usbhost with root mode, run sim usbdev or plug-in cdcacm usb device. Then you can use /dev/ttyACM to transfer data.</p></li></ol><h3 id="login" tabindex="-1">login <a class="header-anchor" href="#login" aria-label="Permalink to &quot;login&quot;">​</a></h3><p>This is a configuration with login password protection for nuttx shell.</p><p>NOTES:</p><blockquote><p>This config has password protection enabled. Here is the login info:</p><pre><code>USERNAME:  admin
PASSWORD:  Administrator
</code></pre><p>The encrypted password is retained in /etc/passwd. I am sure that you will find this annoying. You can disable the password protection by de-selecting CONFIG_NSH_CONSOLE_LOGIN=y.</p></blockquote><h3 id="can" tabindex="-1">can <a class="header-anchor" href="#can" aria-label="Permalink to &quot;can&quot;">​</a></h3><p>This is a configuration with simulated CAN support. Both CAN character driver and SocketCAN are enabled and use the host <code>vcan0</code> interface. The <code>vcan0</code> host interface must be available when NuttX is started.</p><p>For the CAN character device, there is <code>examples/can</code> application enabled in read-only mode.</p><p>Additionally, SocketCAN <code>candump</code> and <code>cansend</code> utils are enabled.</p><p>Below is an example of receiving CAN frames from host to NuttX. Requirement: <code>cansequence</code> tool from <code>linux-can/can-utils</code></p><ol><li><p>Create virtual CAN on host:</p><pre><code>ip link add dev can0 type vcan
ifconfig can0 up
</code></pre></li><li><p>Run NuttX:</p><pre><code>./nuttx
</code></pre></li><li><p>Bring up can0 on NuttX:</p><pre><code>nsh&gt; ifup can0
ifup can0...OK
</code></pre></li><li><p>read CAN messages from SocketCAN on NuttX:</p><pre><code>nsh&gt; candump can0
</code></pre></li><li><p>send CAN messages from host to NuttX:</p><pre><code> cansequence can0
</code></pre></li><li><p>frames from host should be received on NuttX:</p><pre><code>nsh&gt; candump can0
can0  002   [1]  00
can0  002   [1]  01
can0  002   [1]  02
can0  002   [1]  03
can0  002   [1]  04
can0  002   [1]  05
can0  002   [1]  06
can0  002   [1]  07
can0  002   [1]  08
can0  002   [1]  09
can0  002   [1]  0A
can0  002   [1]  0B
can0  002   [1]  0C
can0  002   [1]  0D
can0  002   [1]  0E
can0  002   [1]  0F
can0  002   [1]  10
can0  002   [1]  11
can0  002   [1]  12
</code></pre></li></ol><h2 id="readme-txt" tabindex="-1">README.txt <a class="header-anchor" href="#readme-txt" aria-label="Permalink to &quot;README.txt&quot;">​</a></h2>`,260)]))}const m=t(s,[["render",i]]);export{u as __pageData,m as default};
