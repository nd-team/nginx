#!/bin/bash
git pull origin master | grep "Already up-to-date." > /dev/null
if [ $? -eq 0 ];then
	exit
else
 	echo ">>>>>>>>>nginx更新配置<<<<<<<<<<"
	systemctl restart nginx	
fi
