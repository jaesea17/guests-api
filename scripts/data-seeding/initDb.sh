npx ts-node ./importFirstRole.ts
status=$?
echo "Exit status: $status"

npx ts-node ./importFirstUser.ts
status=$?  
echo "Exit status: $status"

exit $status