import { CheckIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../../shared/utils/dom';
import { useProgressBar } from '../hooks';

export function RingBuilderProgressBar() {
  const { steps } = useProgressBar();
  return (
    <div className="tw-mb-[10px] tw-lg:mb-[20px]">
      <div className="lg:tw-border-b lg:tw-white tw-bg-[#801B2B]">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="tw-overflow-hidden tw-rounded-md lg:tw-flex lg:tw-rounded-none lg:tw-border-white"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="tw-relative tw-overflow-hidden lg:tw-flex-1">
                <div
                  className={classNames(
                    stepIdx === 0 ? 'tw-rounded-t-md tw-border-b-0' : '',
                    stepIdx === steps.length - 1 ? 'tw-rounded-b-md tw-border-t-0' : '',
                    'tw-overflow-hidden tw-border-b tw-border-white lg:tw-border-0',
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
                          stepIdx !== steps.length - 1 ? 'lg:tw-border-r' : '',
                        )}
                      >
                        <span className="tw-shrink-0">
                          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-white">
                            <CheckIcon aria-hidden="true" className="tw-size-6 tw-text-[#801B2B]" />
                          </span>
                        </span>
                        <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
                          <span className="tw-font-medium tw-text-white">{step.name}</span>
                          <span className="tw-font-medium tw-text-white">{step.description}</span>
                        </span>
                      </span>
                    </a>
                  ) : step.status === 'current' ? (
                    <a href={step.href} aria-current="step">
                      <span
                        aria-hidden="true"
                        className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-1 tw-bg-white lg:tw-bottom-0 lg:tw-top-auto lg:tw-h-1 lg:tw-w-full"
                      />
                      <span
                        className={classNames(
                          stepIdx !== 0 ? 'lg:tw-pl-9' : '',
                          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium',
                          stepIdx !== steps.length - 1 ? 'tw-border-r' : '',
                        )}
                      >
                        <span className="tw-shrink-0">
                          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-white">
                            <span className="tw-text-white">{step.id}</span>
                          </span>
                        </span>
                        <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
                          <span className="tw-font-medium tw-text-white">{step.name}</span>
                          <span className="tw-font-medium tw-text-white">{step.description}</span>
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
                          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-white">
                            <span className="tw-text-white">{step.id}</span>
                          </span>
                        </span>
                        <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
                          <span className="tw-font-medium tw-text-white">{step.name}</span>
                          <span className="tw-font-medium tw-text-white">{step.description}</span>
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
