#
#!/bin/sh

##########################################################
#
# This script is intend to config and install a Mac
#
#
# Launch: ./install.sh
#
##########################################################


is_installed() {
	is_installed="$(type -p "$1")"
}

echo_success() {
	# echo success meesage
	printf "\e[32m✔ ${1}"
	echo
	echo "\033[0m"
	echo
}

echo_fail() {
	# echo error message
	printf "\e[31m✘ ${1}"
	echo
	echo "\033[0m"
	echo
}

check_installed() {
	# $1 : name of the module (string)
	# $2 : exit script if failed (boolean)
	if is_installed ${1}; then
		echo_success "${1} is now installed"
	else
		echo_fail "${1} installation failed"
		if $2; then
			exit 1
		fi
	fi
}

install_xcode() {
	if xcode-select -p > /dev/null; then
		echo_success "xcode is installed"
	else
		echo "xcode is not installed"
		echo "installing xcode"
		sudo xcode-select --install
		read -s -n 1 -p "press any key when xcode is installed successfully"
		install_xcode
	fi
}

build_and_server() {
	gulp $1:dev
	gulp $1:server
}


# install xcode
install_xcode

# install Home Brew

echo "checking if brew is installed"
if brew ls --versions myformula > /dev/null; then
	echo_success "brew is installed"
else
	echo "brew is not installed"
	echo "installing brew..."
	if ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"; then
		echo_success "brew is installed"
	else
		echo_fail "brew installation failed"
		exit 1
	fi
fi

brew tap homebrew/versions
brew update
echo_success "brew is now updated"


# install Node JS

if is_installed node; then
	echo_success "node installed"
else
	echo "node is not installed"
	echo "installing node..."
	brew install homebrew/versions/node$(echo $NODE_VERSION | sed 's/\.//g')

	check_installed node true
fi

# install Gulp

if is_installed gulp; then
	echo_success "gulp is installed"
else
	echo "gulp is not installed"
	echo "installing gulp ..."
	npm install -g gulp
	check_installed gulp false
fi


echo "running NPM to install project dependencies..."
npm install