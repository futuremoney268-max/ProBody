<?php
header('Content-Type: application/json');

$countFile = __DIR__ . '/count.json';
$count = 0;

try {
    // Read POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $clientCount = isset($input['count']) ? (int)$input['count'] : null;

    // Read current count safely
    if (file_exists($countFile)) {
        $json = file_get_contents($countFile);
        if ($json !== false) {
            $data = json_decode($json, true);
            if (isset($data['count'])) {
                $count = (int)$data['count'];
            }
        }
    }

    // Use client-provided count if valid, otherwise increment
    if ($clientCount !== null && $clientCount > $count) {
        $count = $clientCount;
    } else {
        $count++;
    }

    // Save back with file locking to prevent race conditions
    $success = file_put_contents($countFile, json_encode(['count' => $count], JSON_PRETTY_PRINT), LOCK_EX);

    if ($success === false) {
        throw new Exception('Failed to write to count.json');
    }

    // Return the updated count
    echo json_encode(['status' => 'success', 'count' => $count]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>