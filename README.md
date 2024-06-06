# QR Code Generator Service

This project is a QR code generator service built with Rust using the Actix-Web framework. It allows users to create customizable QR codes by specifying parameters such as background color, dot color, border size, border radius, and the overall size of the QR code.

## Features

- **Customizable QR Codes**: Generate QR codes with customizable background color, dot color, border size, border radius, and size.
- **Dynamic Image Generation**: Generates PNG images of QR codes on-the-fly based on the specified parameters.
- **Actix-Web Integration**: Provides an HTTP API endpoint to create QR codes.

## Prerequisites

- **Rust**: Ensure you have Rust installed. You can install Rust using [rustup](https://rustup.rs/).
- **Cargo**: Cargo is the Rust package manager and it comes installed with Rust.

## Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/yourusername/qrcode-service.git
    cd qrcode-service
    ```

2. **Install dependencies**:

    ```sh
    cargo build
    ```

3. **Run the server**:

    ```sh
    cargo run
    ```

## Usage

The service provides a single API endpoint to create QR codes.

### Endpoint

- **POST** `/api/v1/createQr`

### Request Parameters

The endpoint accepts a JSON payload with the following fields:

- `data` (string): The content to encode in the QR code.
- `logo_base64` (string, optional): the base64 encoded image.
- `background_color` (string, optional): The background color of the QR code in hex format (e.g., `#FFFFFF` for white). Default is `#FFFFFF`.
- `dot_color` (string, optional): The color of the QR code dots in hex format (e.g., `#000000` for black). Default is `#000000`.
- `format` (string, optional): either "svg" or "png". will default to "png" image output.
- `size` (integer, optional): The size of the QR code image in pixels. Default is `256`.
- `border` (integer, optional): The size of the border around the QR code. Default is `0`.
- `border_radius` (integer, optional): The radius of the border's corners. Default is `0`.

#### Example Request

```sh
curl -X POST http://localhost:8080/api/v1/createQr \
     -H "Content-Type: application/json" \
     -d '{
           "data": "https://example.com",
           "background_color": "#F4D35E",
           "dot_color": "#083D77",
           "size": 400,
           "border": 20,
           "border_radius": 5
         }'
```

#### Example Response

The endpoint will return the generated QR code as a PNG image.

### Example JSON Payload
```json
{
  "data": "https://example.com",
  "background_color": "#F4D35E",
  "dot_color": "#083D77",
  "size": 400,
  "border": 20,
  "border_radius": 5
}
```

## Project Structure
* `src/main.rs`: Entry point of the application.
* `src/routes/qr.rs`: Contains the implementation of the QR code generation logic and API endpoint.
* `Cargo.toml`: Configuration file for the Rust project.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

