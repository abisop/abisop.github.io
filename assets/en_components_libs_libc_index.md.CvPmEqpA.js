import{_ as t,c as a,al as i,o}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"libc","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/libs/libc/index.md","filePath":"en/components/libs/libc/index.md"}'),n={name:"en/components/libs/libc/index.md"};function r(s,e,l,d,c,h){return o(),a("div",null,e[0]||(e[0]=[i(`<h1 id="libc" tabindex="-1">libc <a class="header-anchor" href="#libc" aria-label="Permalink to &quot;libc&quot;">​</a></h1><p>This directory contains numerous, small functions typically associated with what you would expect to find in a standard C library. The sub-directories in this directory contain standard interface that can be executed by user-mode programs.</p><p>Normally, NuttX is built with no protection and all threads running in kernel-mode. In that mode, there is no real architectural distinction between what is a kernel-mode program and what is a user-mode program; the system is more like an multi-threaded program that all runs in kernel-mode.</p><p>But if the <code>CONFIG_BUILD_PROTECTED</code> option is selected, NuttX will be built into distinct user-mode and kernel-mode sections. In that case, most of the code in the <code>nuttx/</code> directory will run in kernel-mode with exceptions of (1) the user-mode &quot;proxies&quot; found in syscall/proxies, and (2) the standard C library functions found in this directory. In this build mode, it is critical to separate the user-mode OS interfaces in this way.</p><p>If <code>CONFIG_BUILD_KERNEL</code> is selected, then only a NuttX kernel will be built with no applications.</p><h2 id="sub-directories" tabindex="-1">Sub-Directories <a class="header-anchor" href="#sub-directories" aria-label="Permalink to &quot;Sub-Directories&quot;">​</a></h2><p>The files in the <code>libs/libc/</code> directory are organized (mostly) according which file in the <code>include/</code> directory provides the prototype for library functions. So we have:</p><pre><code>audio     - This part of the audio system: nuttx/audio/audio.h
builtin   - Support for builtin applications.  Used by nuttx/binfmt and NSH.
dlfcn     - dlfcn.h
endian    - endian.h
errno     - errno.h
hex2bin   - hex2bin.h
libgen    - libgen.h
locale    - locale.h
lzf       - lzf.h
fixedmath - fixedmath.h
grp       - grp.h
inttypes  - inttypes.h
machine   - Various architecture-specific implementations.
math      - math.h
elf    - Part of module and shared library logic: nuttx/lib/elf.h
net       - Various network-related header files: netinet/ether.h, arpa/inet.h
pthread   - pthread.h
pwd       - pwd.h
queue     - queue.h
sched     - sched.h
semaphore - semaphore.h
stdio     - stdio.h
stdlib    - stdlib.h
string    - string.h (and legacy strings.h and non-standard nuttx/b2c.h)
time      - time.h
uio       - sys/uio.h
unistd    - unistd.h
wchar     - wchar.h
wctype    - wctype.h
</code></pre><p>Most of these are &quot;standard&quot; header files; some are not: <code>hex2bin.h</code> and <code>fixemath.h</code> are non-standard.</p><p>There is also a <code>misc/</code> subdirectory that contains various internal functions and interfaces from header files that are too few to warrant their own sub-directory:</p><pre><code>misc      - Nonstandard &quot;glue&quot; logic, debug.h, crc32.h, dirent.h
</code></pre><h2 id="library-database" tabindex="-1">Library Database <a class="header-anchor" href="#library-database" aria-label="Permalink to &quot;Library Database&quot;">​</a></h2><p>Information about functions available in the NuttX C library information is maintained in a database. That &quot;database&quot; is implemented as a simple comma-separated-value file, libc.csv. Most spreadsheets programs will accept this format and can be used to maintain the library database.</p><p>This library database will (eventually) be used to generate symbol library symbol table information that can be exported to external applications.</p><p>The format of the CSV file for each line is:</p><pre><code>Field 1: Function name
Field 2: The header file that contains the function prototype
Field 3: Condition for compilation
Field 4: The type of function return value.
Field 5 - N+5: The type of each of the N formal parameters of the function
</code></pre><p>Each type field has a format as follows:</p><pre><code>type name:
      For all simpler types
formal type | actual type:
      For array types where the form of the formal (eg. int parm[2])
      differs from the type of actual passed parameter (eg. int*).  This
      is necessary because you cannot do simple casts to array types.
formal type | union member actual type | union member fieldname:
      A similar situation exists for unions.  For example, the formal
      parameter type union sigval -- You cannot cast a uintptr_t to
      a union sigval, but you can cast to the type of one of the union
      member types when passing the actual parameter.  Similarly, we
      cannot cast a union sigval to a uinptr_t either.  Rather, we need
      to cast a specific union member fieldname to uintptr_t.
</code></pre><p>NOTE: The tool mksymtab can be used to generate a symbol table from this CSV file. See <code>Documentation/components/tools</code> for further details about the use of mksymtab.</p><h2 id="symtab" tabindex="-1">symtab <a class="header-anchor" href="#symtab" aria-label="Permalink to &quot;symtab&quot;">​</a></h2><h3 id="symbol-tables-and-build-modes" tabindex="-1">Symbol Tables and Build Modes <a class="header-anchor" href="#symbol-tables-and-build-modes" aria-label="Permalink to &quot;Symbol Tables and Build Modes&quot;">​</a></h3><p>This directory provide support for a symbol table which provides all/most of system and C library services/functions to the application and NSH.</p><p>Symbol tables have differing usefulness in different NuttX build modes:</p><ol><li>In the FLAT build (<code>CONFIG_BUILD_FLAT</code>), symbol tables are used to bind addresses in loaded ELF or NxFLAT modules to base code that usually resides in FLASH memory. Both OS interfaces and user/application libraries are made available to the loaded module via symbol tables.</li><li>Symbol tables may be of value in a protected build (<code>CONFIG_BUILD_PROTECTED</code>) where the newly started user task must share resources with other user code (but should use system calls to interact with the OS).</li><li>But in the kernel build mode (<code>CONFIG_MODULES</code>), only fully linked executables loadable via <code>execl()</code>, <code>execv()</code>, or <code>posix_spawan()</code> can be used. There is no use for a symbol table with the kernel build since all memory resources are separate; nothing is share-able with the newly started process.</li></ol><h3 id="code-text-size-implications" tabindex="-1">Code/Text Size Implications <a class="header-anchor" href="#code-text-size-implications" aria-label="Permalink to &quot;Code/Text Size Implications&quot;">​</a></h3><p>The option can have substantial effect on system image size, mainly code/text. That is because the instructions to generate symtab.inc above will cause EVERY interface in the NuttX RTOS and the C library to be included into build. Add to that the size of a huge symbol table.</p><p>In order to reduce the code/text size, you may want to manually prune the auto-generated symtab.inc file to remove all interfaces that you do not wish to include into the base FLASH image.</p><h2 id="implementation-details" tabindex="-1">Implementation Details <a class="header-anchor" href="#implementation-details" aria-label="Permalink to &quot;Implementation Details&quot;">​</a></h2>`,28)]))}const p=t(n,[["render",r]]);export{m as __pageData,p as default};
