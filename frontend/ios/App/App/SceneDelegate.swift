import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = CAPBridgeViewController()
        window?.makeKeyAndVisible()

        // Anti-piracy: iOS can't block a screenshot, but it can hide content
        // while the screen is being recorded/mirrored. Cover the window whenever
        // UIScreen.isCaptured flips on.
        NotificationCenter.default.addObserver(
            self, selector: #selector(captureChanged),
            name: UIScreen.capturedDidChangeNotification, object: nil)
        applyCaptureCover()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    private var captureCover: UIView?

    @objc private func captureChanged() { applyCaptureCover() }

    private func applyCaptureCover() {
        guard let window = window else { return }
        if UIScreen.main.isCaptured {
            if captureCover == nil {
                let cover = UIView(frame: window.bounds)
                cover.backgroundColor = UIColor(red: 0.07, green: 0.07, blue: 0.07, alpha: 1)
                cover.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                let label = UILabel(frame: cover.bounds)
                label.text = "Screen recording is not permitted"
                label.textColor = UIColor(white: 0.6, alpha: 1)
                label.textAlignment = .center
                label.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                cover.addSubview(label)
                window.addSubview(cover)
                captureCover = cover
            }
        } else {
            captureCover?.removeFromSuperview()
            captureCover = nil
        }
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
