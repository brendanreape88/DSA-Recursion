#!/usr/bin/env bash

echo "Don't build flipper"
sed -i.bak '/use_flipper!/d' ios/Podfile