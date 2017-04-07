#!/bin/bash
ps -ef | grep -v ".svn" | grep -v "grep" | grep hook-index.js > /dev/null
if [ $? -ne 0 ];then
	nohup ./start.sh
fi
