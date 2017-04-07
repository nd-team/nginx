#!/bin/bash
ps -ef | grep -v ".svn" | grep hook-index.js
if [ $? -ne 0 ];
	nohup ./start.sh
fi
