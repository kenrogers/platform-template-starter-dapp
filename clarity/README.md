# Starter Smart Contract

A minimal Clarity smart contract demonstrating core concepts and best practices for Stacks development.

## Contract Overview

The `starter` contract provides a simple foundation demonstrating:
- State management with data variables
- User-specific data storage with maps
- Access control patterns
- Error handling
- Read-only and public functions

## Contract Functions

### Read-Only Functions

#### `get-counter`
Returns the current counter value.
- **Returns**: `(response uint uint)` - The current counter value

#### `get-message`
Returns the current message stored in the contract.
- **Returns**: `(response (string-utf8 500) uint)` - The current message

#### `get-user-score`
Returns the score for a specific user.
- **Parameters**: 
  - `user`: `principal` - The user's principal address
- **Returns**: `(response uint uint)` - The user's score (defaults to 0 if not set)

#### `get-contract-owner`
Returns the contract owner's principal address.
- **Returns**: `(response principal uint)` - The contract owner's address

### Public Functions

#### `increment`
Increments the counter by 1.
- **Returns**: `(response uint uint)` - The new counter value
- **Access**: Anyone can call this function

#### `decrement`
Decrements the counter by 1.
- **Returns**: `(response uint uint)` - The new counter value
- **Errors**: Returns `err-invalid-value (u101)` if counter is already 0

#### `set-message`
Updates the contract's message (owner only).
- **Parameters**:
  - `new-message`: `(string-utf8 500)` - The new message to set
- **Returns**: `(response (string-utf8 500) uint)` - The new message
- **Access**: Only the contract owner
- **Errors**: Returns `err-owner-only (u100)` if called by non-owner

#### `update-score`
Updates a user's score (owner only).
- **Parameters**:
  - `user`: `principal` - The user's principal address
  - `score`: `uint` - The new score value
- **Returns**: `(response uint uint)` - The new score
- **Access**: Only the contract owner
- **Errors**: Returns `err-owner-only (u100)` if called by non-owner

#### `add-to-score`
Allows users to add to their own score.
- **Parameters**:
  - `add-value`: `uint` - The value to add to the caller's score
- **Returns**: `(response uint uint)` - The new total score
- **Access**: Anyone can call this function for their own score

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:report
```

Watch mode for development:
```bash
npm run test:watch
```

## Extending the Contract

This starter contract provides a foundation for building more complex applications. Consider:

1. **Adding Events**: Emit contract events for important state changes
2. **Token Integration**: Add SIP-010 fungible token support
3. **NFT Support**: Integrate SIP-009 non-fungible tokens
4. **Advanced Access Control**: Implement role-based permissions
5. **Time-based Logic**: Add block-height based conditions

## Development Tips

- Use `clarinet check` to validate your contract syntax
- Test thoroughly with both unit tests and `clarinet console`
- Consider gas costs when designing data structures
- Use meaningful error codes and document them
- Follow Clarity best practices for security