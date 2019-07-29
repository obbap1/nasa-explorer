echo "hiii!!!"
echo "Hello $1" 

if command -v feh >/dev/null 2>&1 ; then
    echo "feh found"

else
    echo "installing feh..."
    installer = "sudo apt install feh"
    eval $installer
fi

# Fetch image
fetchimage="feh $1"
output=$(eval "$fetchimage")
echo $output