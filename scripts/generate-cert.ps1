param(
  [string]$OutDir = (Join-Path (Split-Path -Parent $PSScriptRoot) ".certs"),
  [string]$Passphrase = "dev-localhost-https"
)

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$rsa = [System.Security.Cryptography.RSA]::Create(2048)
$req = [System.Security.Cryptography.X509Certificates.CertificateRequest]::new(
  "CN=localhost",
  $rsa,
  [System.Security.Cryptography.HashAlgorithmName]::SHA256,
  [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
)

$req.CertificateExtensions.Add(
  [System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new($false, $false, 0, $false)
)
$req.CertificateExtensions.Add(
  [System.Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new(
    [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]"DigitalSignature, KeyEncipherment",
    $true
  )
)

$ekuOids = [System.Security.Cryptography.OidCollection]::new()
$ekuOids.Add([System.Security.Cryptography.Oid]::new("1.3.6.1.5.5.7.3.1")) | Out-Null
$req.CertificateExtensions.Add(
  [System.Security.Cryptography.X509Certificates.X509EnhancedKeyUsageExtension]::new($ekuOids, $false)
)

$san = [System.Security.Cryptography.X509Certificates.SubjectAlternativeNameBuilder]::new()
$san.AddDnsName("localhost")
$san.AddIpAddress([System.Net.IPAddress]::Loopback)
$san.AddIpAddress([System.Net.IPAddress]::IPv6Loopback)
$req.CertificateExtensions.Add($san.Build())

$now = [System.DateTimeOffset]::UtcNow
$cert = $req.CreateSelfSigned($now.AddDays(-1), $now.AddYears(2))

$pfxPath = Join-Path $OutDir "localhost.pfx"
$cerPath = Join-Path $OutDir "localhost.cer"

[System.IO.File]::WriteAllBytes(
  $pfxPath,
  $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Pfx, $Passphrase)
)
[System.IO.File]::WriteAllBytes(
  $cerPath,
  $cert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert)
)

Write-Output "Generated local TLS certificates:"
Write-Output "  PFX: $pfxPath"
Write-Output "  CER: $cerPath"
