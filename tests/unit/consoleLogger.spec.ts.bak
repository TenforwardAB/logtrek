/**
 * This file is licensed under the European Union Public License (EUPL) v1.2.
 * You may only use this work in compliance with the License.
 * You may obtain a copy of the License at:
 *
 * https:
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed "as is",
 * without any warranty or conditions of any kind.
 *
 * Copyright (c) 2024- Tenforward AB. All rights reserved.
 *
 * Created on 1/24/25 :: 9:43AM BY joyider <andre(-at-)sess.se>
 *
 * This file :: consoleLogger.spec.ts is part of the modulogger project.
 */

import consoleLogger from '../../src/plugins/consoleLogger';
import { LogLevel } from '../../src/types';

describe('consoleLogger', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    afterEach(() => {
        consoleSpy.mockClear();
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    it('should exclude type and timestamp when configured', () => {
        if (consoleLogger.configure) {
            consoleLogger.configure({ output_type: false, output_timestamp: false });
        }

        const message = 'Minimal log message';

        consoleLogger.write('info' as LogLevel, message);

        expect(consoleSpy).toHaveBeenCalledWith('Minimal log message');
    });

    it('should include only the timestamp when type is disabled', () => {
        if (consoleLogger.configure) {
            consoleLogger.configure({ output_type: false, output_timestamp: true });
        }

        const message = 'Log with timestamp only';

        consoleLogger.write('info' as LogLevel, message);

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z: Log with timestamp only$/)
        );
    });

    it('should include only the type when timestamp is disabled', () => {
        if (consoleLogger.configure) {
            consoleLogger.configure({ output_type: true, output_timestamp: false });
        }

        const message = 'Log with type only';

        consoleLogger.write('info' as LogLevel, message);

        expect(consoleSpy).toHaveBeenCalledWith('[INFO]: Log with type only');
    });

});
