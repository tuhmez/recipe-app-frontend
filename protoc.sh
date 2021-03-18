# Path to files
PROTO_FILE_PATH="./src/proto"
# Path to TS plugin
PROTOC_GEN_TS_PATH="$PWD/node_modules/.bin/protoc-gen-ts"
# Path to gRPC plugin, which generate service typings
GRPC_TOOLS_NODE_PROTOC_PLUGIN="$PWD/node_modules/.bin/grpc_tools/grpc_tools_node_protoc_plugin"
# Path to gRPC proto command
GRPC_TOOLS_NODE_PROTOC="$PWD/node_modules/.bin/grpc_tools_node_protoc"
# Path to gRPC web proto command
PROTOC_GEN_GRPC_WEB="$PWD/node_modules/.bin/protoc-gen-grpc-web"
if [[ "$OSTYPE" == "msys" ]]; then
    PROTOC_GEN_TS_PATH="${PROTOC_GEN_TS_PATH}.cmd"
    GRPC_TOOLS_NODE_PROTOC_PLUGIN="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}.cmd"
    GRPC_TOOLS_NODE_PROTOC="${GRPC_TOOLS_NODE_PROTOC}.cmd"
    PROTOC_GEN_GRPC_WEB="${PROTOC_GEN_GRPC_WEB}.cmd"
fi

for f in $PROTO_FILE_PATH/*.proto; do
    ${GRPC_TOOLS_NODE_PROTOC} \
        --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
        --plugin="protoc-gen-grpc-web=${PROTOC_GEN_GRPC_WEB}" \
        --js_out="import_style=commonjs,binary:${PROTO_FILE_PATH}" \
        --ts_out="service=grpc-node:${PROTO_FILE_PATH}" \
        --grpc_out="${PROTO_FILE_PATH}" \
        --grpc-web_out="import_style=commonjs,mode=grpcwebtext:${PROTO_FILE_PATH}" \
        -I "${PROTO_FILE_PATH}" \
        "${f}"
done
