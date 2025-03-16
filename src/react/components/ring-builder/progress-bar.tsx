import { CheckIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../shared/utils/dom';

const steps = [
  { id: '1', name: 'Ring Design', description: 'Start with an engagement ring setting', href: '#', status: 'complete' },
  { id: '2', name: 'Diamond', description: 'Select your Centerstone', href: '#', status: 'current' },
  { id: '3', name: 'Review', description: 'Confirm and finalise your design', href: '#', status: 'upcoming' },
];

export function RingBuilderProgressBar() {
  return (
    <div className="tw-mt-[20px] tw-mb-[10px] lg:tw-my-[45px]">
      <div className="lg:tw-border-b lg:tw-border-t lg:tw-border-gray-200">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="tw-overflow-hidden tw-rounded-md lg:tw-flex lg:tw-rounded-none lg:tw-border-l lg:tw-border-r lg:tw-border-gray-200"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="tw-relative tw-overflow-hidden lg:tw-flex-1">
                <div
                  className={classNames(
                    stepIdx === 0 ? 'tw-rounded-t-md tw-border-b-0' : '',
                    stepIdx === steps.length - 1 ? 'tw-rounded-b-md tw-border-t-0' : '',
                    'tw-overflow-hidden tw-border tw-border-gray-200 lg:tw-border-0',
                  )}
                >
                  {step.status === 'complete' ? (
                    <a href={step.href} className="tw-group">
                      <span
                        aria-hidden="true"
                        className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-1 tw-bg-transparent tw-group-hover:tw-bg-gray-200 lg:tw-bottom-0 lg:tw-top-auto lg:tw-h-1 lg:tw-w-full"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:tw-pl-9' : '',
                          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium',
                          stepIdx !== steps.length - 1 ? 'tw-border-r' : '',
                        )}
                      >
                        <span className="tw-shrink-0">
                          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-indigo-600">
                            <CheckIcon aria-hidden="true" className="tw-size-6 tw-text-white" />
                          </span>
                        </span>
                        <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
                          <span className="tw-font-medium">{step.name}</span>
                          <span className="tw-font-medium tw-text-gray-500">{step.description}</span>
                        </span>
                      </span>
                    </a>
                  ) : step.status === 'current' ? (
                    <a href={step.href} aria-current="step">
                      <span
                        aria-hidden="true"
                        className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-1 tw-bg-indigo-600 lg:tw-bottom-0 lg:tw-top-auto lg:tw-h-1 lg:tw-w-full"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:tw-pl-9' : '',
                          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium',
                          stepIdx !== steps.length - 1 ? 'tw-border-r' : '',
                        )}
                      >
                        <span className="tw-shrink-0">
                          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-indigo-600">
                            <span className="tw-text-indigo-600">{step.id}</span>
                          </span>
                        </span>
                        <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
                          <span className="tw-font-medium tw-text-indigo-600">{step.name}</span>
                          <span className="tw-font-medium tw-text-gray-500">{step.description}</span>
                        </span>
                      </span>
                    </a>
                  ) : (
                    <a href={step.href} className="tw-group">
                      <span
                        aria-hidden="true"
                        className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-1 tw-bg-transparent tw-group-hover:tw-bg-gray-200 lg:tw-bottom-0 lg:tw-top-auto lg:tw-h-1 lg:tw-w-full"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:tw-pl-9' : '',
                          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium',
                          stepIdx !== steps.length - 1 ? 'tw-border-r' : '',
                        )}
                      >
                        <span className="tw-shrink-0">
                          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-gray-300">
                            <span className="tw-text-gray-500">{step.id}</span>
                          </span>
                        </span>
                        <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
                          <span className="tw-font-medium tw-text-gray-500">{step.name}</span>
                          <span className="tw-font-medium tw-text-gray-500">{step.description}</span>
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
