import{_ as s,c as n,al as e,o as p}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"gdbserver","description":"","frontmatter":{},"headers":[],"relativePath":"en/debugging/gdbserver.md","filePath":"en/debugging/gdbserver.md"}'),t={name:"en/debugging/gdbserver.md"};function i(l,a,c,r,o,d){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="gdbserver" tabindex="-1">gdbserver <a class="header-anchor" href="#gdbserver" aria-label="Permalink to &quot;gdbserver&quot;">​</a></h1><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>This tool can utilize a crash log on a PC to simulate a set of GDB server functionalities, enabling the use of GDB to debug the context of a NuttX crash. The script directory is located in <code>tools/gdbserver.py</code>.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>We can use <code>-h</code> to get help information:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> usage: gdbserver.py [-h] -e ELFFILE [-l LOGFILE] [-a {arm,arm-a,arm-t,riscv,esp32s3,xtensa}] [-p PORT] [-g GDB] [-i [INIT_CMD]]</span></span>
<span class="line"><span>                 [-r [RAWFILE ...]] [-c [COREDUMP]] [--debug]</span></span>
<span class="line"><span></span></span>
<span class="line"><span> options:</span></span>
<span class="line"><span>   -h, --help            show this help message and exit</span></span>
<span class="line"><span>   -e ELFFILE, --elffile ELFFILE</span></span>
<span class="line"><span>                         elffile</span></span>
<span class="line"><span>   -l LOGFILE, --logfile LOGFILE</span></span>
<span class="line"><span>                         logfile</span></span>
<span class="line"><span>   -a {arm,arm-a,arm-t,riscv,esp32s3,xtensa}, --arch {arm,arm-a,arm-t,riscv,esp32s3,xtensa}</span></span>
<span class="line"><span>                         Only use if can&#39;t be learnt from ELFFILE.</span></span>
<span class="line"><span>   -p PORT, --port PORT  gdbport</span></span>
<span class="line"><span>   -g GDB, --gdb GDB     provided a custom GDB path, automatically start GDB session and exit gdbserver when exit GDB.</span></span>
<span class="line"><span>   -i [INIT_CMD], --init-cmd [INIT_CMD]</span></span>
<span class="line"><span>                         provided a custom GDB init command, automatically start GDB sessions and input what you provide. if you don&#39;t</span></span>
<span class="line"><span>                         provide any command, it will use default command [-ex &#39;bt full&#39; -ex &#39;info reg&#39; -ex &#39;display /40i pc-40&#39;].</span></span>
<span class="line"><span>   -r [RAWFILE ...], --rawfile [RAWFILE ...]</span></span>
<span class="line"><span>                         rawfile is a binary file, args format like ram.bin:0x10000 ...</span></span>
<span class="line"><span>   -c [COREDUMP], --coredump [COREDUMP]</span></span>
<span class="line"><span>                         coredump file, will prase memory in this file</span></span>
<span class="line"><span>   --debug               if enabled, it will show more logs.</span></span></code></pre></div><h2 id="log-example" tabindex="-1">Log Example <a class="header-anchor" href="#log-example" aria-label="Permalink to &quot;Log Example&quot;">​</a></h2><ol><li>Use ./tools/configure.sh esp32s3-devkit:nsh and disable [CONFIG_NSH_DISABLE_MW]{.title-ref}.</li><li class="title-ref">[make -j]</li><li>Flash image to esp32s3-devkit.</li><li>Run [minicom -D /dev/ttyUSB0 -b 115200]{.title-ref} and reset esp32s3-devkit.</li><li>Use [mw -1]{.title-ref} on nsh to trigger a crash.</li><li>Get the crash log from minicom and save it to [crash.log]{.title-ref}.</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>up_dump_register:    PC: 42009cd8    PS: 00060820</span></span>
<span class="line"><span>up_dump_register:    A0: 82007d71    A1: 3fc8b6d0    A2: 3fc8b8e0    A3: 00000000</span></span>
<span class="line"><span>up_dump_register:    A4: ffffffff    A5: 00000000    A6: 00000001    A7: 00000000</span></span>
<span class="line"><span>up_dump_register:    A8: ffffffff    A9: 3fc8b690   A10: ffffffff   A11: 00000000</span></span>
<span class="line"><span>up_dump_register:   A12: 0000002d   A13: 0000002d   A14: 3fc8bb6d   A15: 0fffffff</span></span>
<span class="line"><span>up_dump_register:   SAR: 00000000 CAUSE: 0000001c VADDR: ffffffff</span></span>
<span class="line"><span>up_dump_register:  LBEG: 40055499  LEND: 400554a9  LCNT: fffffffc</span></span>
<span class="line"><span>dump_stack: User Stack:</span></span>
<span class="line"><span>dump_stack:   base: 0x3fc8b0e0</span></span>
<span class="line"><span>dump_stack:   size: 00002000</span></span>
<span class="line"><span>dump_stack:     sp: 0x3fc8b6d0</span></span>
<span class="line"><span>stack_dump: 0x3fc8b6c0: 82007770 3fc8b700 3fc8b8e0 00000002 ffffffff 3fc89f54 00060e20 00000000</span></span>
<span class="line"><span>stack_dump: 0x3fc8b6e0: 3fc8b8e0 3fc8b778 00000000 3fc8b750 82007850 3fc8b720 3fc8b8e0 00000002</span></span>
<span class="line"><span>stack_dump: 0x3fc8b700: 3fc8b720 42009c84 3fc8bb68 3fc8b8e0 82006b04 3fc8b7d0 3fc8b8e0 3fc8bb68</span></span>
<span class="line"><span>stack_dump: 0x3fc8b720: 3fc8bb68 3fc8bb6b 00000000 00000000 00000000 00000000 00000000 00000000</span></span>
<span class="line"><span>stack_dump: 0x3fc8b740: 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000</span></span>
<span class="line"><span>stack_dump: 0x3fc8b760: 00000000 00000000 00000000 00000000 00000000 00000000 00000000 3fc8bb69</span></span>
<span class="line"><span>stack_dump: 0x3fc8b780: 82006ad5 00000000 00000000 00000040 00000040 3fc8bb6e 3fc8adf8 0000002c</span></span>
<span class="line"><span>stack_dump: 0x3fc8b7a0: ffffffff 00000005 00000000 00000000 3fc8bae0 00000000 00000000 00000000</span></span>
<span class="line"><span>stack_dump: 0x3fc8b7c0: 820068a2 3fc8b800 3fc8b8e0 3c020837 00000001 3fc8b800 3fc8b8e0 3c020837</span></span>
<span class="line"><span>stack_dump: 0x3fc8b7e0: 0000000a 3fc8bae0 00000001 3fc8bb68 82006865 3fc8b820 00000001 3fc8b0c0</span></span>
<span class="line"><span>stack_dump: 0x3fc8b800: 00000001 3fc8bb68 00000000 3fc8ae1c 82003618 3fc8b840 00000001 3fc8b0c0</span></span>
<span class="line"><span>stack_dump: 0x3fc8b820: 3fc8b8e0 00000000 00000000 00000000 820019dc 3fc8b870 42006834 00000001</span></span>
<span class="line"><span>stack_dump: 0x3fc8b840: 00000064 00000000 00000000 00000000 3c0225d8 3fc89590 00000000 3fc880cc</span></span>
<span class="line"><span>stack_dump: 0x3fc8b860: 00000000 3fc8b890 00000000 00000000 3fc8b0c0 00000002 00000000 3fc8ad98</span></span>
<span class="line"><span>stack_dump: 0x3fc8b880: 00000000 3fc8b8b0 00000000 00000000 00000000 00000000 00000000 00000000</span></span></code></pre></div><ol start="7"><li class="title-ref">Run [./tools/gdbserver.py -e nuttx -l crash.log -p 1234 -a esp32s3]</li><li class="title-ref">Run [xtensa-esp32s3-elf-gdb nuttx -ex &quot;target remote 127.0.0.1:1234&quot;]</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GNU gdb (esp-gdb) 12.1_20221002</span></span>
<span class="line"><span>Copyright (C) 2022 Free Software Foundation, Inc.</span></span>
<span class="line"><span>License GPLv3+: GNU GPL version 3 or later &lt;http://gnu.org/licenses/gpl.html&gt;</span></span>
<span class="line"><span>This is free software: you are free to change and redistribute it.</span></span>
<span class="line"><span>There is NO WARRANTY, to the extent permitted by law.</span></span>
<span class="line"><span>Type &quot;show copying&quot; and &quot;show warranty&quot; for details.</span></span>
<span class="line"><span>This GDB was configured as &quot;--host=x86_64-linux-gnu --target=xtensa-esp-elf&quot;.</span></span>
<span class="line"><span>Type &quot;show configuration&quot; for configuration details.</span></span>
<span class="line"><span>For bug reporting instructions, please see:</span></span>
<span class="line"><span>&lt;https://www.gnu.org/software/gdb/bugs/&gt;.</span></span>
<span class="line"><span>Find the GDB manual and other documentation resources online at:</span></span>
<span class="line"><span>    &lt;http://www.gnu.org/software/gdb/documentation/&gt;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>For help, type &quot;help&quot;.</span></span>
<span class="line"><span>Type &quot;apropos word&quot; to search for commands related to &quot;word&quot;...</span></span>
<span class="line"><span>Reading symbols from nuttx...</span></span>
<span class="line"><span>Remote debugging using 127.0.0.1:1234</span></span>
<span class="line"><span>0x42009cd8 in cmd_mw (vtbl=0x3fc8b8e0, argc=&lt;optimized out&gt;, argv=&lt;optimized out&gt;) at nsh_dbgcmds.c:259</span></span>
<span class="line"><span>259               nsh_output(vtbl, &quot;  %p = 0x%08&quot; PRIx32, ptr, *ptr);</span></span>
<span class="line"><span>(gdb) bt</span></span>
<span class="line"><span>#0  0x42009cd8 in cmd_mw (vtbl=0x3fc8b8e0, argc=&lt;optimized out&gt;, argv=&lt;optimized out&gt;) at nsh_dbgcmds.c:259</span></span>
<span class="line"><span>#1  0x42007d71 in nsh_command (vtbl=0x3fc8b8e0, argc=2, argv=0x3fc8b720) at nsh_command.c:1154</span></span>
<span class="line"><span>#2  0x42007770 in nsh_execute (oflags=&lt;optimized out&gt;, redirfile=0x0, argv=0x3fc8b720, argc=2, vtbl=0x3fc8b8e0)</span></span>
<span class="line"><span>    at nsh_parse.c:845</span></span>
<span class="line"><span>#3  nsh_parse_command (vtbl=0x3fc8b8e0, cmdline=&lt;optimized out&gt;) at nsh_parse.c:2744</span></span>
<span class="line"><span>#4  0x42007850 in nsh_parse (vtbl=0x3fc8b8e0,</span></span>
<span class="line"><span>    cmdline=0x3fc8bb68 &lt;error: Cannot access memory at address 0x3fc8bb68&gt;) at nsh_parse.c:2828</span></span>
<span class="line"><span>#5  0x42006b04 in nsh_session (pstate=0x3fc8b8e0, login=&lt;optimized out&gt;, argc=1, argv=&lt;optimized out&gt;)</span></span>
<span class="line"><span>    at nsh_session.c:245</span></span>
<span class="line"><span>#6  0x420068a2 in nsh_consolemain (argc=1, argv=0x3fc8b0c0) at nsh_consolemain.c:71</span></span>
<span class="line"><span>#7  0x42006865 in nsh_main (argc=1, argv=0x3fc8b0c0) at nsh_main.c:74</span></span>
<span class="line"><span>#8  0x42003618 in nxtask_startup (entrypt=0x42006834 &lt;nsh_main&gt;, argc=1, argv=0x3fc8b0c0)</span></span>
<span class="line"><span>    at sched/task_startup.c:70</span></span>
<span class="line"><span>#9  0x420019dc in nxtask_start () at task/task_start.c:134</span></span>
<span class="line"><span>(gdb)</span></span></code></pre></div><h2 id="raw-file-example" tabindex="-1">Raw file Example <a class="header-anchor" href="#raw-file-example" aria-label="Permalink to &quot;Raw file Example&quot;">​</a></h2><ol><li>If you obtain the memory file from your board, you can also use gdbserver.py to reconstruct the scene. The most common way to get the raw file is to use the dump memory command in GDB to dump the memory and save it as a file.</li><li class="title-ref">Run [./tools/gdbserver.py -e nuttx -r rawfile:0x1000 -a arm]</li><li>Run gdb with target remote.</li></ol><h2 id="coredump-example" tabindex="-1">Coredump Example <a class="header-anchor" href="#coredump-example" aria-label="Permalink to &quot;Coredump Example&quot;">​</a></h2><ol><li class="title-ref">If you have a coredump, you also can run [./tools/gdbserver.py -e nuttx -c coredump -a arm]</li><li>Run gdb with target remote.</li></ol><p>The benefit of this approach is that in a multi-core AMP system, a single coredump might contain memory information from other cores. By analyzing this coredump along with the corresponding ELF files from the other cores, you can reconstruct the crash site of those other cores.</p><h2 id="thread-awarenes" tabindex="-1">Thread awarenes <a class="header-anchor" href="#thread-awarenes" aria-label="Permalink to &quot;Thread awarenes&quot;">​</a></h2><p class="title-ref">[gdbserver.py]{.title-ref} implements thread debugging based on [g_pidhash]{.title-ref}, [g_npidhash]{.title-ref}, and [g_tcbinfo]{.title-ref} in NuttX. If the log, raw file, or coredump you provide can read these variables, it means you can use thread-related commands in GDB, such as [info thread]{.title-ref} or [thread]</p><h2 id="how-to-add-new-architecture" tabindex="-1">How to add new architecture <a class="header-anchor" href="#how-to-add-new-architecture" aria-label="Permalink to &quot;How to add new architecture&quot;">​</a></h2><p>The main objective is to establish the sequence of registers in GDB, aligning the register names in the crash log with the order of registers in GDB. This alignment will facilitate the creation of a new architecture&#39;s GDB server.</p>`,20)]))}const h=s(t,[["render",i]]);export{u as __pageData,h as default};
