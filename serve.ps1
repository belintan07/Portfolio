$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
try {
    $listener.Start()
    Write-Host "HTTP server running at http://localhost:$port/"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        try {
            $rawPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
            if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
                $rawPath = "/index.html"
            }
            $targetFile = Join-Path (Get-Location) $rawPath.TrimStart('/')
            if (Test-Path $targetFile -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($targetFile)
                $ext = [System.IO.Path]::GetExtension($targetFile).ToLower()
                switch ($ext) {
                    ".html" { $response.ContentType = "text/html; charset=utf-8" }
                    ".htm"  { $response.ContentType = "text/html; charset=utf-8" }
                    ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                    ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                    ".json" { $response.ContentType = "application/json; charset=utf-8" }
                    ".jpg"  { $response.ContentType = "image/jpeg" }
                    ".jpeg" { $response.ContentType = "image/jpeg" }
                    ".png"  { $response.ContentType = "image/png" }
                    ".svg"  { $response.ContentType = "image/svg+xml" }
                    ".pdf"  { $response.ContentType = "application/pdf" }
                    default { $response.ContentType = "application/octet-stream" }
                }
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        } catch {
            Write-Host ("Error serving: " + $_)
        } finally {
            $response.Close()
        }
    }
} catch {
    Write-Host ("Fatal error: " + $_)
} finally {
    $listener.Stop()
}
