{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    yarn
  ];
  shellHook = ''
    export NODE_OPTIONS=--openssl-legacy-provider
  '';
}
