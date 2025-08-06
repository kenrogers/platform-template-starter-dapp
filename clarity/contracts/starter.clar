;; Starter Contract
;; A minimal smart contract demonstrating core Clarity concepts

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-invalid-value (err u101))

;; Data Variables
(define-data-var counter uint u0)
(define-data-var message (string-utf8 500) u"Hello, Stacks!")

;; Data Maps
(define-map user-scores principal uint)

;; Read-only Functions

(define-read-only (get-counter)
  (ok (var-get counter))
)

(define-read-only (get-message)
  (ok (var-get message))
)

(define-read-only (get-user-score (user principal))
  (ok (default-to u0 (map-get? user-scores user)))
)

(define-read-only (get-contract-owner)
  (ok contract-owner)
)

;; Public Functions

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))
  )
)

(define-public (decrement)
  (let ((current (var-get counter)))
    (if (> current u0)
      (begin
        (var-set counter (- current u1))
        (ok (var-get counter))
      )
      err-invalid-value
    )
  )
)

(define-public (set-message (new-message (string-utf8 500)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set message new-message)
    (ok new-message)
  )
)

(define-public (update-score (user principal) (score uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (map-set user-scores user score)
    (ok score)
  )
)

(define-public (add-to-score (add-value uint))
  (let (
    (current-score (default-to u0 (map-get? user-scores tx-sender)))
    (new-score (+ current-score add-value))
  )
    (map-set user-scores tx-sender new-score)
    (ok new-score)
  )
)