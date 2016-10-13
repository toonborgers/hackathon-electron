npm install --unsafe-perm
bower install --allow-root

gulp test:unit
echo $?>resultcode

chmod -R 0777 .