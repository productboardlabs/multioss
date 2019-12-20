
import { Linter } from 'eslint';

/**
 * @see https://github.com/Stuk/eslint-plugin-header
 * HEADER PLUGIN
 */
export const config: Linter.Config = {
  plugins: ['header'],
  rules: {
    'header/header': [
      'error',
      'block',
      {
        pattern:
          '^\\*\\n \\* Copyright \\(c\\) \\d{4}-present, ProductBoard, Inc.\\n \\* All rights reserved.\\n .*',
        template:
          '*\n * Copyright (c) 2019-present, ProductBoard, Inc.\n * All rights reserved.\n ',
      },
    ],
  },
};
