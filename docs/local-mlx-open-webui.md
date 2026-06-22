# Local MLX and Open WebUI

This repo wires a local OpenAI-compatible MLX model server into Open WebUI.

## URLs

- `http://open-webui.localhost` - Open WebUI, proxied by Caddy.
- `http://oi.localhost` - alias for Open WebUI.
- `http://mlx.localhost` - MLX API backend, proxied by Caddy.
- `http://127.0.0.1:18080` - direct Open WebUI Docker host port.
- `http://127.0.0.1:8080` - direct MLX API backend.

## How It Is Wired

`local-services/Caddyfile` defines the local hostnames:

```caddyfile
http://open-webui.localhost {
	reverse_proxy 127.0.0.1:18080
}

http://mlx.localhost {
	reverse_proxy 127.0.0.1:8080
}
```

`docker/open-webui/compose.yaml` exposes Open WebUI on host port `18080` and configures it to call MLX from inside Docker:

```yaml
OPENAI_API_BASE_URLS: "http://host.docker.internal:8080/v1"
OPENAI_API_KEYS: "local"
ports:
  - "18080:8080"
```

Open WebUI uses the OpenAI-compatible `/v1` API exposed by `mlx_lm.server`.

## Start and Stop

Start Open WebUI:

```sh
./bin/open-webui up
```

Start MLX:

```sh
./bin/mlx-lm-server start
```

Stop Open WebUI:

```sh
./bin/open-webui stop
```

Stop MLX:

```sh
./bin/mlx-lm-server stop
```

## Status and Logs

Check Open WebUI:

```sh
./bin/open-webui ps
```

Check MLX:

```sh
./bin/mlx-lm-server status
```

Follow MLX logs:

```sh
./bin/mlx-lm-server logs
```

## Smoke Tests

Open WebUI through Caddy:

```sh
curl --noproxy '*' -I http://open-webui.localhost
```

Open WebUI direct port:

```sh
curl --noproxy '*' -I http://127.0.0.1:18080
```

MLX model API through Caddy:

```sh
curl --noproxy '*' http://mlx.localhost/v1/models
```

MLX model API direct port:

```sh
curl --noproxy '*' http://127.0.0.1:8080/v1/models
```

## Model

The default model is controlled by `bin/mlx-lm-server`:

```sh
MLX_LM_MODEL=Youssofal/Qwen3.6-35B-A3B-Abliterated-Heretic-MLX-4bit
```

Override it for one run:

```sh
MLX_LM_MODEL=owner/model-name ./bin/mlx-lm-server restart
```

## Common Issues

If `open-webui.localhost` shows another app, check for a port collision. Open WebUI should be on `18080`; common app dev servers often use `3000`.

```sh
lsof -nP -iTCP:18080 -sTCP:LISTEN
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

If `mlx.localhost` returns `502 Bad Gateway`, Caddy is running but MLX is not reachable on port `8080`.

```sh
./bin/mlx-lm-server status
./bin/mlx-lm-server logs
```

If hostname routes do not update after editing `local-services/Caddyfile`, reload Caddy:

```sh
caddy validate --config /opt/homebrew/etc/Caddyfile
caddy reload --config /opt/homebrew/etc/Caddyfile
```
