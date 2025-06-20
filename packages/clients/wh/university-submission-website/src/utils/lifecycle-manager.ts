import gsap from "gsap";

export class LifecycleManager {
  public ctx: gsap.Context | null;

  private boundAfterSwapHandler: () => void;
  private boundPageLoadHandlers: Map<string, () => void>;

  constructor() {
    this.ctx = null;
    this.boundAfterSwapHandler = this.onChangePage.bind(this);
    this.boundPageLoadHandlers = new Map();
    document.addEventListener("astro:after-swap", this.boundAfterSwapHandler);
  }

  /**
   * Initialize the context
   */
  initializeContext(): void {
    if (this.ctx === null) {
      this.ctx = gsap.context(() => {});
    }
  }

  /**
   * Check if the component with the given ID exist in the DOM
   * @param id id of the element
   * @returns boolean
   */
  elementExists(id: string): boolean {
    if (!id) throw new Error("ID cannot be null");
    return document.getElementById(id) !== null;
  }

  /**
   * Execute the callback when the page is loaded and the component is visible
   * @param id id of the element
   * @param callback callback function
   */
  onElementLoaded(
    id: string,
    callback: (ctx: gsap.Context | null) => void,
  ): void {
    if (!this.boundPageLoadHandlers.has(id)) {
      const handler = () => this.onPageLoad(id, callback);
      this.boundPageLoadHandlers.set(id, handler);
      document.addEventListener("astro:page-load", handler);
    }
  }

  /**
   * Callback for the page load event
   * @param id id of the element
   * @param callback
   */
  onPageLoad(id: string, callback: (ctx: gsap.Context | null) => void): void {
    if (this.elementExists(id)) {
      this.initializeContext();
      callback(this.ctx);
    }
  }

  /**
   * Revert the context
   */
  revertContext() {
    if (this.ctx !== null) {
      this.ctx.revert();
      this.ctx = null;
    }
  }

  /**
   * When changing page revert the context
   *  and remove the event listeners
   */
  onChangePage(): void {
    this.revertContext();
  }

  /**
   * Cleanup all event listeners
   */
  cleanup(): void {
    this.revertContext();
    document.removeEventListener(
      "astro:after-swap",
      this.boundAfterSwapHandler,
    );
    this.boundPageLoadHandlers.forEach((handler, id) => {
      document.removeEventListener("astro:page-load", handler);
    });
    this.boundPageLoadHandlers.clear();
  }
}

export default LifecycleManager;
