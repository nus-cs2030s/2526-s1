# The CS2030S Programming Environment

## Java version

Java is a language that continues to evolve.  A new version is released every six months.  For CS2030S, we will _only_ use Java 21, the most recent version with long-term support.  Specifically, we use `openjdk version "21.0.7" 2025-04-15` on Ubuntu 20.04.6 LTS.


## PE Hosts

The school has provided a list of computing servers for you to use, with all the required software for CS2030S installed.  You can access them remotely via `ssh`, or Secure SHell.  {++There is a load balancer named `pelogin`.  This is where we will connect.++}  (`pe` stands for "programming environment").  We will refer to these servers generally as the _PE hosts._

{++You no longer need to choose which host to use.  The load balancer will automatically assign you to the appropriate host.++}

While you can complete the programming assignments on your computers, the practical exams are done in a controlled environment using servers similar to the PE hosts.  It is therefore advisable for you to familiarize yourself with accessing the PE servers via `ssh` and edit your program with either `vim` or `emacs` (`vim` is recommended and supported).


## Accessing the PE Hosts

### Basic Requirements

1. You should be familiar with the terms Unix, command-line interface, command prompt, terminal, and shell.  Read this [background article](../unix/background.md) if you don't.

1. You need to have an SoC Unix account.  If you do not have one, you can [apply for one online](https://mysoc.nus.edu.sg/~newacct/).

2. Once you have an account, you need to [activate your access to the PE hosts](https://mysoc.nus.edu.sg/~myacct/services.cgi), which are part of the SoC computer clusters.

3. You need a command line `ssh` client.  Windows 10, macOS, and Linux users should already have it installed by default.

4. You need a good [terminal emulator](../unix/background.md#what-is-a-terminal).  For Microsoft Windows users, you can use either PowerShell or [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/); Mac users can use the default [Terminal](https://support.apple.com/en-sg/guide/terminal/welcome/mac) or [iTerm2](https://iterm2.com/index.html).  

### The Command to SSH

To connect to a remote host, run the following in your terminal on your local computer:

```
ssh <username>@<hostname>
```

Replace `<username>` with your SoC Unix username and `<hostname>` with the name of the host you want to connect to. For instance, I would do:

```
ssh ooiwt@pelogin.comp.nus.edu.sg
```

if I want to connect to `pelogin.comp.nus.edu.sg`.

After the command above, follow the instructions on the screen.  The first time you ever connect to `pelogin.comp.nus.edu.sg`, you will be warned that you are connecting to a previously unknown host.  Answer `yes`.  After that, you will be prompted with your SoC Unix password.  Note that nothing is shown on the screen when your password is entered.

{++**The following animation is outdated as you you should connect to `pelogin.comp.nus.edu.sg`.  But what you will see is similar to what see below.**++}

<script id="asciicast-4rtH1KENV6QOdKtlY0T7mce0M" src="https://asciinema.org/a/4rtH1KENV6QOdKtlY0T7mce0M.js" async></script>

### Accessing The PE Hosts from Outside SoC

The PE hosts can only be accessed from _within_ the School of Computing networks.  If you want to access it from outside, you need to connect through SoC VPN.

First, you need to set up a Virtual Private Network (VPN) (See [instructions here](https://dochub.comp.nus.edu.sg/cf/guides/network/vpn)).  The staff at the IT helpdesk in COM1, Level 1, will be able to help you with setting up if needed.

!!! note "SoC VPN vs NUS VPN"

    Note that SoC VPN is different from NUS VPN.  Connecting to NUS VPN only allows you access to the NUS internal network, but not the SoC internal network.

!!! note "FortiClient VPN vs FortiClient"

    When you setup the SoC VPN client, please make sure that you download and install "FortiClient VPN Only", and not "FortiClient".  The latter is a commercial product that would stop working after the free trial is over.   On the other hand, "FortiClient VPN" is a free product.

### Troubleshooting

Some common error messages and what they mean:

1. > `ssh: Could not resolve hostname pelogin.comp.nus.edu.sg`

    `ssh` cannot recognize the name `pelogin`. Likely, you tried to connect to the PE hosts directly from outside of the SoC network.

2. > `Connection closed by 192.168.48.xxx port 22`

    You have connected to the PE host, but you are kicked out because you have no permission to use the host.

    Make sure you have activated your access to "SoC computer clusters" [here](https://mysoc.nus.edu.sg/~myacct/services.cgi).

3. > `Permission denied, please try again`

    You did not enter the correct password or username.  Please use the username and password of your SoC Unix account which you have created [here](https://mysoc.nus.edu.sg/~newacct/).

    Check that you have entered your username correctly.  It is _case-sensitive_.

    If you have lost your password, go here [reset your password](https://mysoc.nus.edu.sg/~myacct/resetpass.cgi).

4. > `Could not chdir to home directory /home/o/ooiwt: Permission denied`

    This error means that you have successfully connected to the PE hosts, but you have no access to your home directory. 

    This should not happen.  Please [file a service request with SoC IT Unit](https://rt.comp.nus.edu.sg/). Include the error message, the PE hosts that you connected to, and your username.  The system administrator can reset the permission of your home directory for you.


## Copying Files between PE Nodes and Local Computer

{--Secure copy, or `scp`, is one way to transfer files between the programming environments and your local computer.  `scp` behaves just like `cp` (see [Unix: Essentials](../unix/essentials.md)).  The command takes in two arguments, the source, and the destination.  The difference is that we use the `<username>@<hostname>:<filename>` notation to specify a file on a remote host.--}

{--Let's say you want to transfer a set of C files from the directory `lab01` to your local computer.  Then, on the local computer, run:--} (**command no longer work**)

{--The expression `*.java` is a regular expression that means all files with a filename ending with `.java` (see [Advanced Topics on Unix](../unix/advanced.md)).
You can copy specific files as well.  For instance, to copy the file `Hello.java` from your local computer to your `~/lab01` directory:--} (**command no longer work**)

{--`scp` supports `-r` (recursive copy) as well.--}

{--Note that we always run `scp` on your local computer in the examples above, since the SSH server runs on the PE host.--}

{++Currently, scp and sftp is blocked on `pelogin`.  We recommend working on `pelogin` directly as it will be a good practice to prepare for your practical.++}


## Setting up SSH Keys

The next step is not required but is a time-saver and a huge quality-of-life improvement.  _You need to be familiar with basic Unix commands_, including how to copy files to remote hosts (using `scp`) and how to check/change file permissions (using `ls -l` and `chmod`).  If you are still not comfortable with these commands, make sure you play with the [basic Unix commands](../unix/essentials.md) first.  You can come back and complete this step later. 

Our goal here is to set up a pair of public/private keys for authentication so that you do not need to type your password every time you log into a PE host.

You can use the following command on your local computer to generate a pair of keys:

```
ssh-keygen -t rsa
```

This command will generate two keys, a private key `id_rsa`, and a public key `id_rsa.pub`.  {++You will be prompted for a passphrase.  This is the passphrase to protect your private key on your local computer.  You can enter an empty passphrase (at the cost of weaker security) to avoid being prompted for the passphrase whenever you access the private key[^1].++} 

Keep the private key `id_rsa` on your local machine in the hidden `~/.ssh` directory and copy the public key `id_rsa.pub` to your account on PE `pelogin`.

There are two methods to do this.  {++You only need to apply one of them.++}

### Method 1: Using `ssh-copy-id`

{--If your local machine has `ssh-copy-id` installed, then, run:--} (**command no longer work**)

{--You will be prompted to enter your password for the PE host.  After this step is completed, your public key will be copied to and configured for password-less login to the PE hosts.--}

{++The method above should no longer work with the new restriction.++}

### Method 2: Using `scp`

{--First, use `scp` to copy the public key `id_rsa.pub` from your local machine to your home directory on PE `pelogin`.--}

{--On `pelogin`, run--} (**command no longer work**)

{--Make sure that the permission for `.ssh` both on the local machine and on PE is set to `700` and the files `id_rsa` on the local machine and `authorized_keys` on the remote machine are set to `600`.  See the guide on using [`ls`](../unix/essentials.md#ls-list-content-of-a-directory) and [`chmod`](../unix/essentials.md#file-permission-management) if you are unsure how to do this.--}

{--Once set up, you need not enter your password every time you run `ssh` or `scp`.--}

{++The method above should no longer work with the new restriction.++}

### Method 3: Copy-and-Paste

{++This step is modified from [Ed discussion](https://edstem.org/us/courses/79067/discussion/6865432) post by Tan Yu Zhe, Rayn.++}

1. Once you connect to `pelogin` and in your home directory, create a directory named `.ssh` using the following command.

    ```Shell
    mkdir .ssh
    ```

2. Set the permission so that only you can access (to make sure it is secure) using the following command.

    ```Shell
    chmod 700 .ssh
    ```

3. Enter the directory using the following command.

    ```Shell
    cd .ssh
    ```

4. Create a file named `authorized_keys`.  We will be using vim.

    ```Shell
    vim authorized_keys
    ```

5. Once in vim, you can copy-and-paste the content of `id_rsa.pub` into `authorized_keys`.  In insert mode if ++ctrl+v++ does not work, you may be able to use ++shift+insert++ instead.  You may press ++i++ to go into insert mode.

6. Save and quit vim by typing `:wq` in command mode.  You may press ++esc++ to go into command mode.

7. Set the permission so that only you can access (to make sure it is secure) using the following command.

    ```Shell
    chmod 600 authorized_keys
    ```



## Stability of Network Connection
    
Note that a stable network connection is required to use the PE hosts for a long period without interruption.   If you encounter frequent disconnections while working at home or on campus while connected wirelessly, please make sure that your Wi-Fi signal is strong and that there is no interference from other sources. 

If your connection is disconnected in the middle of editing, `vim` saves the state of the buffer for you.  See the section on [recovery files](../vim/tips.md#5-recovery-files) on how to recover your files.

If you find yourself facing frequent disconnection, you can consider running [`screen`](https://en.wikipedia.org/wiki/GNU_Screen).  After logging into a PE host, run:

```
screen
```

You will see some messages, press ++enter++ to go to the command prompt. You can now use the PE host as usual. In case you are disconnected (e.g., in the middle of editing), you can log into the same PE host again, and run:

```
screen -r
```

to resume your previous session.

[^1]: Alternatively you can read more about setting up `ssh-agent` with a passphrase for better security.
