

### Run on android device

```
# Add Android platform to projet if not already done
$ ionic platform add android

# Set `ANDROID_HOME` env var
$ export ANDROID_HOME=/home/user/android-sdk

# Run application
$ ionic run android
```

### FAQ

* How to install android on linux : 

[Good tutorial here](https://androidonlinux.wordpress.com/2013/05/12/setting-up-adb-on-linux)

* Get adb cli tool : 

```
sudo apt-get install android-tools-adb
```

* How to persist $ANDROID_HOME : 

```
$ sudo echo "export ANDROID_HOME=/home/user/android-sdk" >> /etc/environment
$ source /etc/environment
```
