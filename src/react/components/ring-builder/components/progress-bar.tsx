import { CheckIcon } from '@heroicons/react/24/solid';
import { useFetchProduct } from '../../../shared/hooks/product';
import { classNames } from '../../../shared/utils/dom';
import { useRingBuilderNavigation } from '../hooks';
import { RingBuilderService } from '../services';
import { Step } from '../types';

export function RingBuilderProgressBar() {
  const ring = new RingBuilderService();
  const [productId, productVariantId, _, diamondId, diamondShapeGid] = ring.getCurrentConfiguration();
  const product = useFetchProduct(productId!);
  const diamond = useFetchProduct(diamondId!);
  const diamondPageHref = ring.createDiamondPageUrl(productId!, productVariantId!, diamondShapeGid!);
  const { steps } = useRingBuilderNavigation(product, diamond, diamondPageHref);
  return (
    <div className="tw-mb-[10px] tw-lg:mb-[20px]">
      <div className="lg:tw-white tw-bg-[#801B2B]">
        <nav aria-label="Progress">
          <ol role="list" className="tw-overflow-hidden tw-rounded-md lg:tw-flex lg:tw-rounded-none lg:tw-border-white">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="tw-relative tw-overflow-hidden lg:tw-flex-1">
                <div className="tw-border-b-2 tw-border-white lg:tw-border-b-0">
                  {step.status === 'complete' && <CompletedStep step={step} stepIdx={stepIdx} steps={steps} />}
                  {step.status === 'current' && <CurrentStep step={step} stepIdx={stepIdx} steps={steps} />}
                  {step.status === 'upcoming' && <UpcomingStep step={step} stepIdx={stepIdx} steps={steps} />}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

interface StepProps {
  step: Step;
  stepIdx: number;
  steps: Step[];
}

function CompletedStep({ step, steps, stepIdx }: StepProps) {
  return (
    <div className="tw-group">
      <span
        aria-hidden="true"
        className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-1 tw-bg-transparent tw-group-hover:tw-bg-gray-200 lg:tw-bottom-0 lg:tw-top-auto lg:tw-h-1 lg:tw-w-full"
      />
      <span
        className={classNames(
          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium tw-border-white',
          stepIdx !== steps.length - 1 ? 'lg:tw-border-r-2' : '',
        )}
      >
        <span className="tw-shrink-0">
          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-bg-white">
            <CheckIcon aria-hidden="true" className="tw-stroke-2 tw-size-6 tw-text-[#801B2B]" stroke="currentColor" />
          </span>
        </span>
        <div className="tw-flex tw-w-full">
          <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
            <h3 className="tw-font-medium tw-text-white tw-pb-3">{step.name}</h3>
            <span className="tw-font-medium tw-text-white tw-text-nowrap">{step.description}</span>
            <a href={step.href} className="tw-text-white tw-underline">
              Change
            </a>
          </span>
          <span className="tw-grow">{step.icon}</span>
        </div>
      </span>
    </div>
  );
}

function CurrentStep({ step, stepIdx, steps }: StepProps) {
  return (
    <div aria-current="step">
      <span
        className={classNames(
          stepIdx !== 0 ? 'lg:tw-pl-9' : '',
          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium',
          stepIdx !== steps.length - 1 ? 'lg:tw-border-r-2' : '',
        )}
      >
        <span className="tw-shrink-0">
          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-white">
            <span className="tw-text-white">{step.id}</span>
          </span>
        </span>
        <div className="tw-flex tw-w-full">
          <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
            <h3 className="tw-font-medium tw-text-white tw-pb-3 tw-underline">{step.name}</h3>
            <span className="tw-font-medium tw-text-white tw-text-nowrap">{step.description}</span>
            <a href={step.href} className="tw-invisible">
              Change
            </a>
          </span>
          <span className="tw-grow">{step.icon}</span>
        </div>
      </span>
    </div>
  );
}

function UpcomingStep({ step, stepIdx, steps }: StepProps) {
  return (
    <div className="tw-group" aria-current="step">
      <span
        aria-hidden="true"
        className="tw-absolute tw-left-0 tw-top-0 tw-h-full tw-w-1 tw-bg-transparent tw-group-hover:tw-bg-gray-200 lg:tw-bottom-0 lg:tw-top-auto lg:tw-h-1 lg:tw-w-full"
      />
      <span
        className={classNames(
          stepIdx !== 0 ? 'lg:tw-pl-9' : '',
          'tw-flex tw-items-start tw-px-6 tw-py-5 tw-font-medium',
          stepIdx !== steps.length - 1 ? 'lg:tw-border-r-2' : '',
        )}
      >
        <span className="tw-shrink-0">
          <span className="tw-flex tw-size-10 tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-white">
            <span className="tw-text-white">{step.id}</span>
          </span>
        </span>
        <div className="tw-flex tw-w-full">
          <span className="tw-ml-4 tw-mt-0.5 tw-flex tw-min-w-0 tw-flex-col">
            <h3 className="tw-font-medium tw-text-white tw-pb-3">{step.name}</h3>
            <span className="tw-font-medium tw-text-white tw-text-nowrap">{step.description}</span>
            <a href={step.href} className="tw-invisible">
              Change
            </a>
          </span>
          <span className="tw-grow">{step.icon}</span>
        </div>
      </span>
    </div>
  );
}
