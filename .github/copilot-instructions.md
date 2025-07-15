# Copilot Instructions for tevet-troc-client

## General Guidelines

- Always use the latest version of Angular (v20+) and TypeScript
- Sentence case for headers, buttons, and UI text
- Always write complete code with proper typing
- Don't add explanatory comments unless complex logic needs explanation
- Add newlines at end of files
- Use conventional commits format (feat:, fix:, chore:, etc.)

## Project Structure

- This is an Angular NX workspace with app and library packages
- Main application is in the root directory
- Libraries are in `packages/` directory
- Follow existing patterns for component/service organization

## Component Guidelines

- Use modern Angular patterns with signals and inject()
- Follow this component pattern:
  ```typescript
  @Component({
    selector: 'app-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ExampleComponent {
    // Use input() instead of @Input() decorator
    inputData = input<string>();
    
    // Use inject() instead of constructor injection
    private exampleService = inject(ExampleService);
    
    // Use signals for state management
    counter = signal(0);
    
    // Use computed for derived state
    doubleCounter = computed(() => this.counter() * 2);
    
    // Example method
    increment(): void {
      this.counter.update(value => value + 1);
    }
  }
  ```
- Always use standalone components
- Use OnPush change detection
- Prefer reactive forms over template forms
- Use the async pipe for handling observables in templates

## For Adding Features

- Add new components to `packages/ui/**/`
- Add new utilities to `packages/utils/**/`
- Add new business logic to appropriate packages
- Update routing in the main application as needed
- Use route-based code splitting with lazy loading

## For Writing Tests

- Use Jest for unit tests in `*.spec.ts` files
- Tests should cover:
    - Happy path (expected behavior)
    - Edge cases and error handling
    - Any regressions that might be introduced

## Styling

- Use TailwindCSS for styling
- Follow the existing class patterns
- Avoid inline styles
- Use design tokens for colors, spacing, etc.

## Accessibility

- Ensure all components are accessible
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Support screen readers with proper labels and announcements

## Tech Debt

- Add a `TODO (techdebt)` comment to document refactors that should be made in the future

## Version Control

- PRs with label "merge-ready" will be automatically squashed and merged
- PR title should follow conventional commits format
- PR description will be included in the squashed commit message
