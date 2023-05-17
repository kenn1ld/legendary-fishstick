module.exports = {
  mode: "development", // set mode option, 'development' or 'production'
  devServer: {
    allowedHosts: "all",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // also consider .tsx and .ts files
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react", // if using React
              "@babel/preset-typescript", // if using TypeScript
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Webpack will also resolve .ts and .tsx files
  },
};
