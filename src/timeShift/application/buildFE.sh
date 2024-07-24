rm -rf resource/static
mkdir resource/static
mkdir resource/static/do-logout

cd public || exit

echo "building /"
cd mainScreen || exit
ed pack
cp -r docs/* ../../resource/static
rm -rf docs

perl -i -pe 'next if /src="https/; s/src="/src="{{CONTEXT}}\//g' index.html
perl -i -pe 'next if /src="https/; s/src="/src="{{CONTEXT}}\//g' ../../resource/static/index.html

perl -i -pe 'next if /href="https/; s/href="/href="{{CONTEXT}}\//g' index.html
perl -i -pe 'next if /href="https/; s/href="/href="{{CONTEXT}}\//g' ../../resource/static/index.html

cd .. || exit

echo "building /do-logout"
cd do-logout || exit
ed pack
cp -r docs/* ../../resource/static/do-logout
rm -rf docs

perl -i -pe 'next if /src="https/; s/src="/src="{{CONTEXT}}\/do-logout\//g' index.html
perl -i -pe 'next if /src="https/; s/src="/src="{{CONTEXT}}\/do-logout\//g' ../../resource/static/do-logout/index.html

perl -i -pe 'next if /href="https/; s/href="/href="{{CONTEXT}}\/do-logout\//g' index.html
perl -i -pe 'next if /href="https/; s/href="/href="{{CONTEXT}}\/do-logout\//g' ../../resource/static/do-logout/index.html

#echo "building /hades/login"
#cd ../login || exit
#ed pack
#mkdir ../static/hades/
#mkdir ../static/hades/login
#cp -r docs/* ../static/hades/login
#rm -rf docs
