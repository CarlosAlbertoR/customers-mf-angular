module.exports = {
  // Coverage configuration for Angular 20 with modern testing
  coverage: {
    // Source files to include in coverage
    include: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      '!src/**/*.d.ts',
      '!src/test-setup.ts',
      '!src/**/*.module.ts'
    ],
    
    // Source files to exclude from coverage
    exclude: [
      'src/**/*.spec.ts',
      'src/**/*.d.ts',
      'src/test-setup.ts',
      'src/**/*.module.ts',
      'src/**/*.config.ts',
      'src/**/*.interface.ts',
      'src/**/*.model.ts',
      'src/**/*.enum.ts',
      'src/**/*.constant.ts',
      'src/**/*.type.ts'
    ],
    
    // Coverage thresholds
    thresholds: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      },
      // Specific thresholds for different file types
      './src/app/services/': {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90
      },
      './src/app/components/': {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85
      },
      './src/app/stores/': {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90
      }
    },
    
    // Coverage reporters
    reporters: [
      'html',
      'text-summary',
      'lcov',
      'json'
    ],
    
    // Coverage directory
    dir: './coverage/customers-mf',
    
    // Watermarks for coverage quality
    watermarks: {
      statements: [50, 80],
      functions: [50, 80],
      branches: [50, 80],
      lines: [50, 80]
    }
  },
  
  // Test configuration
  test: {
    // Test file patterns
    include: [
      'src/**/*.spec.ts'
    ],
    
    // Test environment setup
    setupFilesAfterEnv: [
      'src/test-setup.ts'
    ],
    
    // Test timeout
    testTimeout: 10000,
    
    // Test retry configuration
    retry: {
      retries: 2
    }
  },
  
  // Modern Angular 20 testing features
  modern: {
    // Enable signal testing
    signals: true,
    
    // Enable computed testing
    computed: true,
    
    // Enable effect testing
    effects: true,
    
    // Enable standalone component testing
    standalone: true,
    
    // Enable inject() function testing
    inject: true,
    
    // Enable modern Angular features
    modernAngular: true
  }
};
