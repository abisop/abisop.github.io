import{_ as r,c as t,al as s,o}from"./chunks/framework.NFAqBSgQ.js";const l=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/renesas/rx65n/boards/rx65n-rsk2mb/ROMFS.md","filePath":"en/platforms/renesas/rx65n/boards/rx65n-rsk2mb/ROMFS.md"}'),n={name:"en/platforms/renesas/rx65n/boards/rx65n-rsk2mb/ROMFS.md"};function i(a,e,d,p,c,h){return o(),t("div",null,e[0]||(e[0]=[s(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>This directory contains logic to support a custom ROMFS system-init script and start-up script. These scripts are used by by the NSH when it starts provided that CONFIG_ETC_ROMFS=y. These scripts provide a ROMFS volume that will be mounted at /etc and will look like this at run-time:</p><pre><code>NuttShell (NSH) NuttX-8.2
nsh&gt; ls -l /etc
/etc:
 dr-xr-xr-x       0 .
 -r--r--r--      20 group
 dr-xr-xr-x       0 init.d/
 -r--r--r--      35 passwd
/etc/init.d:
 dr-xr-xr-x       0 ..
 -r--r--r--     110 rcS
 -r--r--r--     110 rc.sysinit
nsh&gt;
</code></pre><p>/etc/init.d/rc.sysinit is system init script; /etc/init.d/rcS is the start-up script; /etc/passwd is a the password file. It supports a single user:</p><pre><code>USERNAME:  admin
PASSWORD:  Administrator

nsh&gt; cat /etc/passwd
admin:8Tv+Hbmr3pLVb5HHZgd26D:0:0:/
</code></pre><p>The encrypted passwords in the provided passwd file are only valid if the TEA key is set to: 012345678 9abcdef0 012345678 9abcdef0. Changes to either the key or the password word will require regeneration of the nsh_romfimg.h header file.</p><p>The format of the password file is:</p><pre><code>user:x:uid:gid:home
</code></pre><p>Where: user: User name x: Encrypted password uid: User ID (0 for now) gid: Group ID (0 for now) home: Login directory (/ for now)</p><p>/etc/group is a group file. It is not currently used.</p><pre><code>nsh&gt; cat /etc/group
root:*:0:root,admin
</code></pre><p>The format of the group file is:</p><pre><code>group:x:gid:users
</code></pre><p>Where: group: The group name x: Group password gid: Group ID users: A comma separated list of members of the group</p><h2 id="updating-the-romfs-file-system" tabindex="-1">Updating the ROMFS File System <a class="header-anchor" href="#updating-the-romfs-file-system" aria-label="Permalink to &quot;Updating the ROMFS File System&quot;">​</a></h2><p>The content on the nsh_romfsimg.h header file is generated from a sample directory structure. That directory structure is contained in the etc/ directory and can be modified per the following steps:</p><pre><code>1. Change directory to etc/:

   cd etc/

2. Make modifications as desired.

3. Create the new ROMFS image.

   genromfs -f romfs_img -d etc -V SimEtcVol

4. Convert the ROMFS image to a C header file

    xxd -i romfs_img &gt;nsh_romfsimg.h

5. Edit nsh_romfsimg.h, mark both data definitions as &#39;const&#39; so that
   that will be stored in FLASH.
</code></pre>`,18)]))}const f=r(n,[["render",i]]);export{l as __pageData,f as default};
