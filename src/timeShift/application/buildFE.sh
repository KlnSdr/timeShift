rm -rf resource/static
mkdir resource/static

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

#echo "building /hades/login"
#cd ../login || exit
#ed pack
#mkdir ../static/hades/
#mkdir ../static/hades/login
#cp -r docs/* ../static/hades/login
#rm -rf docs
