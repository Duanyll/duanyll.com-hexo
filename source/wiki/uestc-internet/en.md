---
title: Internet Guide (English)
layout: wiki
wiki: docs-uestc-internet
---

## Introduction

This guide provides instructions on how to connect to the internet at the Qingshuihe Campus of the University of Electronic Science and Technology of China (UESTC). It covers different connection methods, common issues, and their solutions. The method of connection varies depending on the dormitory building.

## Academic Buildings

You can access the campus network via wireless or wired connections.

### Wireless Network

1. Open your wireless network settings and connect to the `UESTC-WiFi` network.
2. For first-time connections, open a browser and visit any website. This will automatically redirect you to the login page. Alternatively, you can manually visit [http://wifi.uestc.edu.cn](http://wifi.uestc.edu.cn).
3. Enter your student ID and unified identity authentication password, then click **“校园网登录”** (Campus Network Login).

### Wired Network

1. Connect your computer to the wall network port using an Ethernet cable.
2. Open a browser and visit any website to be automatically redirected to the login page. Alternatively, you can manually visit [http://aaa.uestc.edu.cn](http://aaa.uestc.edu.cn) or [http://10.253.0.237](http://10.253.0.237).
3. Enter your student ID and unified identity authentication password, then click **“校园网登录”** (Campus Network Login).

## Dormitory Area

The network in the dormitory area is provided by telecom operators, and the connection methods differ.

### Phase 1-4 Dormitories - China Mobile Fiber Broadband

> For International Students: Refer to the next section please.

The mobile fiber broadband in Phase 1-4 dormitories is provided by China Mobile and uses the PPPoE dial-up method for connection. In simple terms, you need to connect your router's WAN port to the optical modem, set it to PPPoE dial-up mode, and enter your mobile broadband account and password. You can contact China Mobile staff for on-site network configuration.

> Frequently switching devices to access the network may result in your account being frozen. It is recommended to use a router for dialing rather than dialing directly on your computer. If your account is frozen, please contact China Mobile customer service to unfreeze it.

### Phase 5-6 Dormitories - China Mobile Broadband, All China Telecom Broadband

The mobile broadband in Phase 5-6 dormitories and all China Telecom broadband connections use a web-based authentication method. The steps are as follows:

#### Connecting the Router

You can connect to the network using a wireless router or by directly connecting your computer to the wall network port with an Ethernet cable. Using a wireless router allows multiple devices like phones and tablets to access the internet simultaneously. If you use an Ethernet cable to connect your computer, only the computer can use the campus network.

> In simple terms, you need to configure the router's WAN port to DHCP mode. If you are unsure how to configure it, detailed instructions are provided below.

1. Locate the wall network port, typically found under the desk and possibly blocked by a cabinet. **Do not open the weak current box near the door and connect directly to the optical modem unless you cannot reach the wall network port.** The optical fiber and power cables in the weak current box are fragile and easily damaged. If you open the weak current box and find that all the indicator lights on the optical modem are off, or if the SFP indicator is off or steady yellow, please call `61831192` for repair.
2. Use an Ethernet cable to connect the router's WAN port to the wall network port, or directly connect your computer to the wall network port. The WAN port is usually distinct (often at the end), with a unique color or label, while the other ports are LAN ports. Some routers do not distinguish between WAN and LAN ports; in such cases, any port will work.
   ![WAN Port and LAN Port](https://cdn.duanyll.com/img/20240901161545.png)
   After locating the WAN port, connect it to the network socket with an Ethernet cable as shown below.
   ![WAN Port to Network Socket](https://cdn.duanyll.com/img/20240901162039.png)
3. Connect the router to a power source, turn it on, and wait for it to start up (this may take 1-2 minutes).
4. If your computer has an Ethernet port, you can directly connect it to the router’s LAN port using an Ethernet cable. If not, connect to the router's wireless network. The default WiFi name and password (if any) are written on the router’s label, as shown below:
   ![Router Label](https://cdn.duanyll.com/img/20240901162150.png)
5. After connecting to the router, open a browser and enter the router's management panel address in the address bar. The management address is usually listed on the router label and could be `192.168.1.1`, `tplogin.cn`, `miwifi.com`, etc. Some routers automatically open the management page upon first connection. You may need to enter a default username and password, which can also be found on the router's label.
6. The router will then launch a setup wizard, where you can set your own WiFi name, password, and router management password. Follow your preferences for these settings. The important option is the WAN port setting (sometimes labeled as "Internet Settings" or "WAN Settings"), where you should select **“自动获取 IP 地址”** (Obtain an IP Address Automatically) or **“DHCP”**. Do not select **“PPPoE”**, **“拨号上网”**, or **“静态 IP”**. Once you complete the settings, the router may restart automatically, and you'll need to reconnect to the router using the WiFi name and password you just set. Below is an example of a typical router's "Internet Settings" page:
   ![](https://cdn.duanyll.com/img/20240901163058.png)

#### Binding the Operator Account

The first time you connect to the dormitory network, you need to bind your operator account. Visit the China Telecom or China Mobile service office on campus, *ensure your phone card has broadband service, and ask the operator for your broadband account and password.* After obtaining your broadband account and password, you need to bind the broadband account to your unified identity authentication account as follows:

1. In the dormitory area, connect your computer to the configured router or directly to the wall network port.
2. The network login page may open automatically; if not, manually visit [http://10.253.0.235](http://10.0.253.235).
3. Enter your **student ID and unified identity authentication password**, then click **“自服务”** (Self Service).
4. Click **“多运营商绑定”** (Carriers Bound) on the left.
   ![](https://cdn.duanyll.com/img/20240901164823.png)
5. Select your operator (China Mobile or China Telecom), and click **“绑定”** (Bind).
   ![](https://cdn.duanyll.com/img/20240901164926.png)
6. Enter your broadband account and password, then click **“绑定”** (Bind).
   ![](https://cdn.duanyll.com/img/20240901165038.png)
7. After successful binding, you can view the bound account on the "Carriers Bound" page.

#### Logging into the Campus Network

Once binding is complete, you can use your unified identity authentication account to log into the campus network as follows:

1. Open a browser and visit any website to be automatically redirected to the login page. Alternatively, you can manually visit [http://10.253.0.235](http://10.0.253.235).
2. Enter your **student ID and unified identity authentication password**, and depending on your operator, click **“移动登录”** (Mobile Login) or **“电信登录”** (Telecom Login).

Even with proper setup, you may need to log in again approximately once a week.

## Frequently Asked Questions

- **I can't open the login page, it says "Unable to connect to the website."**
  - There could be several reasons for this. First, ensure that you have closed any proxy servers, VPNs, or accelerators before logging in.
  - Open the Windows Settings app, select "Network & Internet" -> "Proxy," and turn off the proxy server.
    ![](https://cdn.duanyll.com/img/20240901155107.png)
  - In addition to the above proxy settings, VPN software such as WireGuard, EasyConnect, ZeroTier, and **game accelerators** must also be turned off.
  - After successfully logging into the campus network, you can reopen these software programs.

- **I frequently need to log in to the campus network again.**
  - **UESTC-WiFi**: Please ensure that the "Use random MAC address" or a similar option is turned off in the Wi-Fi details.
  - **Teaching Area Wired Network**: The same account can only log in to one device at a time. If your account is logged in on another device, it will cause the previous device to go offline. You will also need to log in again after restarting the computer.
  - **Dormitory Network**: Depending on the settings of the ISP, you usually need to log in again every week. Also, please check whether the wall network port is incorrectly connected to the LAN port. The ISP's settings may also cause you to need to log in repeatedly; you will need to contact the ISP to resolve this.

- **I can't access certain servers in the teaching area from the dormitory, such as the library servers.**
  - There is a firewall between the dormitory network and the teaching area network, so some servers in the teaching area cannot be directly accessed. You can try using the [UESTC VPN](https://vpn.uestc.edu.cn).
  - Even when using the UESTC VPN, some servers may still be inaccessible. Please contact the server administrator or the information center for assistance.

- **I set my router to DHCP or to obtain an IP address automatically, but the router says it cannot obtain an IP address, or it gets an IP address starting with 172. I can't open the login page.**
  - Your optical modem may be malfunctioning. Please call `61831192` to request a repair.

- **I use a router in my dormitory, but only one device can connect to the internet at a time. I need to log in again or cannot access the internet with other devices.**
  - Please make sure the WAN port of the router is connected to the wall network port, and the LAN port is connected to the computer or other devices. If the wall network port is mistakenly connected to the LAN port, only one device will be able to access the internet.

- **I don't know my broadband account or password.**
  - The broadband account for China Mobile is usually `SCXY` followed by your mobile number, and the password is the last 6 digits of your mobile number or a password you set yourself. The broadband account for China Telecom is usually your mobile number, and the password is the last 6 digits, the last 8 digits of your mobile number, or `123456`.
  - If you don't know your broadband account and password, please call the ISP's customer service. The number `61831192` cannot help you retrieve your broadband account and password.
  - If you bind an incorrect account and password, there will be no prompt on the binding page. You will only see a login failure message after clicking the “电信登录” (Telecom Login) or “移动登录” (Mobile Login) button.

- **Can I bind someone else's broadband account?**
  - No. The bound broadband account must be your own. A broadband account can only be bound to one unified identity authentication account; otherwise, it will cause errors.

- **I entered my account and password on the campus network login page and clicked “电信登录” (Telecom Login) or “移动登录” (Mobile Login), but a window popped up saying login failed, with an error code in English.**
  - Please ensure that you entered your unified identity authentication account and password, not the broadband account and password.
  - Make sure you have bound the correct broadband account. After successful binding, you can check the bound account on the “自服务” (Self-service) -> “多运营商绑定” (Carriers Bound) page.
  - If you can't open the “自服务” (Self-service) page, it means the unified identity authentication account and password you entered are incorrect.
  - Please ensure your mobile card is not out of balance and your broadband service has not expired.
  - If you can open the “自服务” (Self-service) page, bind the account, but still cannot log in using the “电信登录” (Telecom Login) or “移动登录” (Mobile Login) buttons on the campus network, it means your broadband account password is incorrect or has been frozen by the ISP. Please contact the ISP's customer service, explain that your account cannot log in to the campus network, and tell them the error message you received.

- **I can open the campus network login page, but after entering my unified identity authentication account and password, I cannot open the self-service page.**
  - You can use a mobile network to open the [Unified Identity Authentication Platform](https://idas.uestc.edu.cn/authserver/login) and try to reset your password.
  - If there is an issue with your unified identity authentication account, please contact the information center at `61831184`.

- **I have transitioned from an undergraduate to a graduate student and have a new student ID. Do I need to rebind my broadband account?**
  - Your old student ID will soon be deactivated by the system, and you need to transfer the broadband account from your old student ID to your new student ID.
  - If your old student ID can still log in to the campus network, you need to unbind the broadband account on the “自服务” (Self-service) page of the old account, and then bind the broadband account on the “自服务” (Self-service) page of the new account.
  - If your old student ID has been deactivated, but you cannot bind the original broadband account to the new student ID, please call `61831184` to contact the information center for assistance.

- **I opened the campus network login page, and it shows that I have successfully logged in, but I still cannot access the internet.**
  - Please first check if any proxies, VPNs, or accelerators are open as mentioned in the first question.
  - Ensure that you did not open the login page from the bookmarks bar, history, or favorites. You need to re-enter the URL and ensure that the browser does not automatically complete the parameters after the URL. (Specifically, if you saved the successfully logged-in page to the bookmarks bar, every time you open the URL from the bookmarks, it will include the parameters from the previous successful login, causing you to see the logged-in page without actually being logged in.)

- **I've tried all the above methods, but I still can't get online.**
  - Please call `61831192` to request a repair.
