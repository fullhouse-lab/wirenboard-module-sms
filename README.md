SMS manager

##  Preparation

1. Insert SIM
2. Insert antena
3. Reboot the device

4. Use console
```
apt-get update
apt-get install gammu
wb-gsm on
gammu networkinfo
wb-gsm restart_if_broken
```

Test command
```
gammu sendsms TEXT +79993330001 -text 'kuku'
```

Please connect your device to the internet

Install NodeJS, if it is not yet
```
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs git make g++ gcc build-essential
```

##  Install

To install this packet use `wirenboard-module` command. Install it if necessary
```
npm i -g wirenboard-module
```

Add sms module and rule
```
wirenboard-module sms
```

##  Troubleshooting

1. No money

If you want break, press Ctrl+C...
Sending SMS 1/1....waiting for network answer..error 28, message reference=-1
Unknown error.

2. Need to reboot WB

Sending SMS 1/1....waiting for network answer..error 2172, message reference=-1
Unknown error.

----

Best regards
- **FullHouse team**
- https://fullhouse-online.ru
- support@fullhouse-online.ru
