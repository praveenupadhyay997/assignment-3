# Test Strategy

## Testing Approach

The testing strategy for Flowboard follows a multi-layered approach, focusing on:

1. **Unit Tests**: For individual components and utility functions
2. **Integration Tests**: For component interactions
3. **End-to-End Tests**: For critical user flows (future implementation)

## Test Coverage

### Current Coverage (65.29% Overall)

## High Coverage (90-100%)
| Component | Statements | Branches | Functions | Lines |
|-----------|-----------|----------|-----------|-------|
| Board.tsx | 100% | 100% | 100% | 100% |
| FilterBar.tsx | 100% | 100% | 100% | 100% |
| TaskCard.tsx | 90.54% | 73.68% | 90.47% | 90.54% |
| boardSlice.ts | 100% | 75% | 100% | 100% |
| filterSlice.ts | 100% | 100% | 100% | 100% |
| store.ts | 93.75% | 100% | 66.66% | 92.85% |

## Medium Coverage (30-60%)
| Component | Statements | Branches | Functions | Lines | Uncovered Lines |
|-----------|-----------|----------|-----------|-------|-----------------|
| Column.tsx | 37.06% | 27.27% | 61.53% | 36.84% | 61-77, 82-86, 90-96, 101-201, 343 |
| storage.ts | 53.33% | 50% | 50% | 46.15% | 7-10, 15-19 |

## Low Coverage (< 30%)
| Component | Statements | Branches | Functions | Lines | Note |
|-----------|-----------|----------|-----------|-------|------|
| DragContext.tsx | 26.47% | 25% | 12.5% | 22.58% | Complex drag/drop logic |
| theme/index.ts | 33.33% | 0% | 0% | 33.33% | Theme configuration |
| throttle.ts | 23.07% | 0% | 33.33% | 16.66% | Utility function |

## Component Coverage

### Core Components (100% Coverage)
- Board
- FilterBar
- TaskCard
- Board Slice
- Filter Slice
- Store Configuration

### Components Needing Attention

#### 1. Column Component (37.06%)
- **Critical Issues**:
  - Drag/drop interactions
  - Column resizing
  - Task reordering logic

#### 2. DragContext (26.47%)
- **Critical Issues**:
  - Drag state management
  - Drop target calculations
  - Cross-column drag operations

#### 3. Theme System (33.33%)
- **Missing Tests**:
  - Theme switching
  - Theme application
  - Dark/light mode transitions

## Test Types

### 1. Unit Tests
- Test individual functions and components in isolation
- Mock all external dependencies
- Focus on pure logic and rendering

### 2. Integration Tests
- Test component interactions
- Verify Redux store updates
- Test user flows across multiple components

### 3. Test Utilities
- Custom test renderers
- Mock providers
- Test data factories

## Test Best Practices

### Writing Tests
- Follow AAA pattern (Arrange, Act, Assert)
- Test behavior, not implementation
- Use descriptive test names
- Keep tests focused and independent

### Test Organization
- Mirror the `src/` directory structure
- Use `.test.tsx` extension for test files
- Group related tests with `describe` blocks
- Use `it` or `test` for individual test cases

### Mocking Strategy
- Mock external services and APIs
- Use MSW for API mocking (future)
- Create reusable mock data

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test/file.test.tsx
```

## Coverage Reports

Coverage reports are generated in the `coverage/` directory. To view the full report:

1. Run `npm test -- --coverage`
2. Open `coverage/lcov-report/index.html` in a browser

## Future Test Improvements

### High Priority
1. Increase Column component test coverage to 70%
2. Implement DragContext tests
3. Add theme switching tests

### Medium Priority
1. Add E2E tests for critical paths
2. Implement visual regression testing
3. Add performance testing

### Low Priority
1. Add accessibility tests
2. Implement snapshot testing
3. Add bundle size monitoring

## Test Dependencies

- Jest
- React Testing Library
- @testing-library/jest-dom
- @testing-library/user-event
- @testing-library/react-hooks
- MSW (Mock Service Worker) - For API mocking

## CI/CD Integration

Tests are automatically run on:
- Pull requests
- Pushes to main branch
- Before deployment

## Performance Considerations

- Keep test files small and focused
- Mock expensive operations
- Use `jest.setup.js` for global test configuration
- Run tests in parallel when possible
