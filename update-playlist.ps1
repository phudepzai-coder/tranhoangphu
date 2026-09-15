# Quet thu muc music/ va cap nhat js/playlist.js
$musicDir = Join-Path $PSScriptRoot "music"
$outFile  = Join-Path $PSScriptRoot "js\playlist.js"

$files = Get-ChildItem -Path $musicDir -Filter *.mp3 | Sort-Object Name | Select-Object -ExpandProperty Name

if ($files.Count -eq 0) {
    Write-Host "Khong tim thay file .mp3 nao trong thu muc music/" -ForegroundColor Yellow
    exit
}

$items = $files | ForEach-Object { '    "' + $_ + '"' }
$content = "const playlist = [`r`n" + ($items -join ",`r`n") + "`r`n];`r`n"
[System.IO.File]::WriteAllText($outFile, $content, [System.Text.Encoding]::UTF8)

Write-Host "Da cap nhat playlist voi $($files.Count) bai hat:" -ForegroundColor Green
$files | ForEach-Object { Write-Host "  - $_" }
