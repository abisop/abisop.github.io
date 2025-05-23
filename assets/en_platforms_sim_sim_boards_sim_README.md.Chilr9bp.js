import{_ as t,c as s,al as r,o as a}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/sim/sim/boards/sim/README.md","filePath":"en/platforms/sim/sim/boards/sim/README.md"}'),i={name:"en/platforms/sim/sim/boards/sim/README.md"};function o(n,e,d,p,h,l){return a(),s("div",null,e[0]||(e[0]=[r(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>This directory contains logic to support a custom ROMFS system-init script and start-up script. These scripts are used by by the NSH when it starts provided that CONFIG_ETC_ROMFS=y. These scripts provide a ROMFS volume that will be mounted at /etc and will look like this at run-time:</p><pre><code>NuttShell (NSH) NuttX-7.31
MOTD: username=admin password=Administrator
nsh&gt; ls -Rl /etc
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
</code></pre><p>Where: group: The group name x: Group password gid: Group ID users: A comma separated list of members of the group</p><h2 id="updating-the-romfs-file-system" tabindex="-1">Updating the ROMFS File System <a class="header-anchor" href="#updating-the-romfs-file-system" aria-label="Permalink to &quot;Updating the ROMFS File System&quot;">​</a></h2><p>The content on the nsh_romfsimg.h header file is generated from a sample directory structure. You can directly modify files under etc/ folder, The build system will regenerate nsh_romfsimg.h automatically.</p><p>See the sim/nsh configuration for an example of the use of this file system.</p><h2 id="replacing-the-password-file" tabindex="-1">Replacing the Password File <a class="header-anchor" href="#replacing-the-password-file" aria-label="Permalink to &quot;Replacing the Password File&quot;">​</a></h2><p>The sim/nsh configuration can also be used to create a new password file. First, make these configuration changes:</p><pre><code>1. Disable logins

   - CONFIG_NSH_CONSOLE_LOGIN=y
   + # CONFIG_NSH_CONSOLE_LOGIN is not set
     # CONFIG_NSH_TELNET_LOGIN is not set

2. Move the password file to a write-able file system:

   - CONFIG_FSUTILS_PASSWD_PATH=&quot;/etc/passwd&quot;
   + CONFIG_FSUTILS_PASSWD_PATH=&quot;/tmp/passwd&quot;

3. make the password file modifiable

   - CONFIG_FSUTILS_PASSWD_READONLY=y
   # CONFIG_FSUTILS_PASSWD_READONLY is not set
</code></pre><p>Now rebuild the simulation. No login should be required to enter the shell and you should find the &#39;useradd&#39;, &#39;userdel&#39;, and &#39;passwd&#39; commands available in the help summary, provided that they are enabled. Make certain that the &#39;useradd&#39; command is not disabled:</p><pre><code>  # CONFIG_NSH_DISABLE_USERADD is not set
</code></pre><p>Use the NSH &#39;useradd&#39; command to add new uses with new user passwords like:</p><pre><code>nsh&gt; useradd &lt;username&gt; &lt;password&gt;
</code></pre><p>Do this as many times as you would like. Each time that you do this a new entry with an encrypted password will be added to the passwd file at /tmp/passwd. You can see the passwd file like:</p><pre><code>nsh&gt; cat /tmp/passwd
</code></pre><p>When you are finished, you can simply copy the /tmp/passwd content from the &#39;cat&#39; command and paste it into an editor. Make sure to remove any carriage returns that may have ended up on the file if you are using Windows.</p><p>Then recreate the nsh_romfsimg.h file as described above. In step 2, simply replace the old /etc/passwd file with the one in your editor. When you are finished, the new passwd file will be in the ROMFS file system at the path /etc/passwd. When you restore the original NSH sim configuration, these are the passwords that will be used.</p>`,29)]))}const u=t(i,[["render",o]]);export{m as __pageData,u as default};
