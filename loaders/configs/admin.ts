export interface Props {
  content: string;
}

/**
 * A loader which allows sellers to configure settings around their Admin.
 * This is essentially an identity function on the props. It serves as a
 * settings storage solution.
 *
 * @param props The Admin config object.
 * @returns The same object it received.
 */
export default function getAdminConfig(
  props: Props,
): Props {
  return props;
}
